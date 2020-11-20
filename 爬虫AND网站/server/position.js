const superagent = require("superagent")
const cheerio = require("cheerio")
const express = require("express")
const async = require("async")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const SearchResult = require("./Model/searchresult.js")
const app = express()
const port = 3000
let j = 0
let postoptions ={
'Accept':'application/json, text/javascript, */*; q=0.01',
'Accept-Encoding':'gzip, deflate, br',
'Accept-Language':'zh-CN,zh;q=0.8',
'Connection':'keep-alive',
'Content-Length':'19',
'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
'Cookie':'user_trace_token=20170509142551-05cac2857bcf4d7db30401862453e438; LGUID=20170509142552-598c7935-3480-11e7-ba67-5254005c3644; index_location_city=%E5%85%A8%E5%9B%BD; JSESSIONID=ABAAABAAAFCAAEG6D0D7A9AD4BF0D21C66E192041CDC43F; _gat=1; _gid=GA1.2.1099492336.1495414282; _ga=GA1.2.2101219114.1494311151; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1495382637,1495382660,1495414277,1495414283; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1495414283; LGSID=20170522085121-c5b23d92-3e88-11e7-a257-525400f775ce; PRE_UTM=; PRE_HOST=www.baidu.com; PRE_SITE=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3D5RFV5jr60nvv_Sh62LZh1n6Mkrh5Cz5ZxHLqV1nxDiS%26wd%3D%26eqid%3Db3ac1216000db6d200000005592235fe; PRE_LAND=https%3A%2F%2Fwww.lagou.com%2F; LGRID=20170522085121-c5b23ef8-3e88-11e7-a257-525400f775ce; TG-TRACK-CODE=index_search; SEARCH_ID=69ec737babf64c4891f24fe5a04c7dcd',
'Host':'www.lagou.com',
'Origin':'https://www.lagou.com',
'Referer':'https://www.lagou.com/jobs/list_%E5%8C%97%E4%BA%AC?labelWords=&fromSearch=true&suginput=',
'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
'X-Anit-Forge-Code':'0',
'X-Anit-Forge-Token':'None',
'X-Requested-With':'XMLHttpRequesta'

}
function getPosition(position){
	mongoose.connect(`mongodb://localhost/java`)
	console.log(`爬虫开始运行了……`)
	console.log(`https://www.lagou.com/jobs/positionAjax.json?kd=${position}&needAddtionalResult=false&pn=1`)
	SearchResult.remove({}, function(err) { 
   console.log('collection removed') 
		});
	let page = 1
	let urls = []
	async.series({
		one:(cb) => {
			superagent.post(`https://www.lagou.com/jobs/positionAjax.json?kd=${position}&needAddtionalResult=false&pn=1`)
					.send({
                        first:true,
						pn:1,
						kd:position
                    	})
					  .set(postoptions)
					  .end((err,res) => {
					  	if (err){
					  		console.log(err)
					  		getBeijing(city,position);
					  		return;
					  	}
					  	else{
					  		console.log(res.text)
	                        page = JSON.parse(res.text).content.positionResult.totalCount;
	                        console.log(page)
	                        cb(null, page);
                    		}
                    	
					  })
					},
		two:(cb) => {
                for (let i = 1; i <= Math.ceil(page / 15); i++) {
                	console.log(`https://www.lagou.com/jobs/positionAjax.json?kd=${position}&needAddtionalResult=false&pn=1`)
                    urls.push(`https://www.lagou.com/jobs/positionAjax.json?kd=${position}&needAddtionalResult=false&pn=1`)
                }
                console.log(`北京职位共${page}条数据，${urls.length}页`);
                cb(null, urls);
            },
        three: () => {
        	async.mapLimit(urls,1 ,(url,cb) =>{
        		superagent.post(url)
        				  .send({
	                        'first':true,
							'pn':1,
							'kd':position
	                    	})
						  .set(postoptions)
						  .end((err,res) => {
						  	if (err) throw err;
						  	let positionLists = JSON.parse(res.text).content.positionResult.result;
						  	positionLists.forEach(function(employ,index){
		
						  		let ads={}
						  		ads.city = employ.city || ""
						  		ads.positionName = employ.positionName || ""
						  		ads.education = employ.education || ""
						  		ads.jobNature = employ.jobNature || ""
						  		ads.salary = employ.salary || ""
						  		ads.financeStage = employ.financeStage || ""
						  		ads.positionLables = employ.positionLables || []
						  		ads.companyShortName = employ.companyShortName || ""
						  		ads.createTime = new Date(employ.createTime)
						  		let searchresult = new SearchResult(ads)
						  		searchresult.save(function(err,ad){
						  			if(err) throw err;
						  			console.log("第"+(++j)+"次成功存入")
						  			console.log(ad)
						  		})
					
						  	})
						  	setTimeout(function(){cb(null,'success')},5000)
						  	
						  })
        	},(err,result) => {
        		if(err) throw err;
        	})
     
        }

	})
}
app.listen(port,function(){
	console.log(`listening at ${port}`);
})
if (process.argv[2]) {
    getPosition(process.argv[2]);
} else {
    console.log('请输入要爬取职位');
}
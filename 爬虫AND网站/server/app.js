const superagent = require("superagent")
const cheerio = require("cheerio")
const express = require("express")
const async = require("async")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');

const SearchResult = require("./Model/searchresult.js")
const app = express()
const port = 3000
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});9
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  
app.post("/api/search",function(req,res){
	let city = req.body.city
	let position = req.body.position
	fetch(city,position)
	
})
/*(app.get("/api/search",function(req,res){
	res.send("success")
})*/
app.get("/",function(req,res){
	res.send("/")
})
app.get("/api",function(req,res){
	res.send("/api")
})
let postoptions = {
    'Host': 'www.lagou.com',
    'Connection': 'keep-alive',
    'Content-Length': 22,
    'Origin': 'https://www.lagou.com',
    'X-Anit-Forge-Code': 0,
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json, text/javascript, */*; q=0.01,',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Anit-Forge-Token': 'None',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    'Cookie': 'user_trace_token=20161013181330-b0c236da-912d-11e6-ac65-5254005c3644; LGUID=20161013181330-b0c23a43-912d-11e6-ac65-5254005c3644; gr_user_id=795fa8ba-ae3c-4319-a14f-9cec4ed09b48; index_location_city=%E5%85%A8%E5%9B%BD; JSESSIONID=50C2FF7D087D03E6EFBC207D84033396; _gat=1; _ga=GA1.2.139182473.1476353609; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1485269301,1485269384,1485269772,1485352603; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1485352603; LGSID=20170125215645-1bb9a560-e306-11e6-bd12-525400f775ce; PRE_UTM=; PRE_HOST=www.baidu.com; PRE_SITE=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DPZoDI8dJxNvTHYDeK5kbo1JCCEJ2LpFvrhJwkruObP7%26wd%3D%26eqid%3Dc8706819000b3969000000065888ae99; PRE_LAND=https%3A%2F%2Fwww.lagou.com%2F; LGRID=20170125215645-1bb9a749-e306-11e6-bd12-525400f775ce; TG-TRACK-CODE=index_search; SEARCH_ID=5c39eff232744101ab72da356abed36b'
};

function fetch(city,position){
	mongoose.connect('mongodb://localhost/searchresult')
	console.log(`爬虫开始运行了……`)
	console.log(city)
	console.log(position)
	console.log(`https://www.lagou.com/jobs/positionAjax.json?needAddtionalResult=false&city=${city}&kd=${position}&pn=1`)
	SearchResult.remove({}, function(err) { 
   console.log('collection removed') 
		});
	let page = 1
	let urls = []
	async.series({
		one:(cb) => {
			superagent.post(`https://www.lagou.com/jobs/positionAjax.json?needAddtionalResult=false&city=${city}&kd=${position}&pn=1`)
					/*.send({
                        'pn': page,
                        'kd': position,
                        'first': true
                    	})
					  .set(postoptions)*/
					  .end((err,res) => {
					  	if (err){
					  		console.log(err)
					  		fetch(city,position);
					  		return;
					  	}
					  						  	
					  	else{
					  		console.log(res.text)
	                        page = JSON.parse(res.text).content.positionResult.totalCount;
	                        console.log(page)
	                        cb(null, page);
                    		}
                    	//}	
					  })
					},
		two:(cb) => {
                for (let i = 1; i <= Math.ceil(page / 15); i++) {
                	console.log(`https://www.lagou.com/jobs/positionAjax.json?needAddtionalResult=false&city=${city}&kd=${position}&pn=${i}`)
                    urls.push(`https://www.lagou.com/jobs/positionAjax.json?needAddtionalResult=false&city=${city}&kd=${position}&pn=${i}`)
                }
                console.log(`${city}的${position}职位共${page}条数据，${urls.length}页`);
                cb(null, urls);
            },
        three: () => {
        	async.mapLimit(urls,1 ,(url,cb) =>{
        		superagent.post(url)
        				  .send({
	                        'pn': page,
	                        'kd': position,
	                        'first': true
	                    	})
						  .set(postoptions)
						  .end((err,res) => {
						  	if (err) throw err;
						  	let positionLists = JSON.parse(res.text).content.positionResult.result;
						  	positionLists.forEach(function(employ,index){
		
						  		let ads={}
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
						  			console.log("成功存入")
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
if (process.argv[2] || process.argv[3]) {
	let space=""
	if(process.argv[2] && process.argv[3]){
    fetch(process.argv[2], process.argv[3]);
	}
	if(process.argv[2] && !process.argv[3]){
		fetch(process.argv[2], space)
	}
	if(!process.argv[2] && process.argv[3]){
		fetch(space, process.argv[3])
	}
} else {
    console.log('请输入要爬取的城市和职位');
}
<template>
  <div>
      <h1>上海地区地区分析</h1>
      <div id="graphOne" width="600" height="600" style="width:600px;height:600px" class="graph"></div>
      <div id="graphTwo" width="600" height="600" style="width:600px;height:600px" class="graph"></div>
      <div id="graphThree" width="600" height="600" style="width:600px;height:600px" class="graph"></div>
      <div id="graphFour" width="1200" height="900" style="width:1200px;height:900px" class="graph"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
 

  export default{
    data () {
      return {
        city: '',
        position: ''
      }
    },
    mounted () {
    let companyLevelArr = []
    let companyArr = []
    let eduLevelArr = []
    let eduArr = []
    let numArr = []
    let salaryArr = []
    let positionArr = []
    let firstoption,secondoption,thirdoption,fourthoption,fifthoption
    let related
    function setOptions(numArr,salaryArr,positionArr){
  firstoption = {
    backgroundColor: '#ffffff',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        formatter:function(data){
          return '平均收入:' +data[0].value + '<br>' + '数量:' +data[1].value/50
        }
    },
    legend: {
        data: ['平均收入', '数量'],
        textStyle: {
            color: '#000'
        }
    },
    xAxis: {
        data:positionArr,
        type:'category',
        nameLocation:'middle',
        axisLine: {
            lineStyle: {
                color: '#000'
            }
        }
    },
    yAxis: [{
        name:'平均收入',
        type:'value',
        splitLine: {show: false},
        axisLine: {
            lineStyle: {
                color: '#000'
            }
        }

    },{
        name:'数量',
        type:'value',
        max:500,
        min:0,
        splitLine: {show: false},
        axisLine: {
            lineStyle: {
                color: '#000'
            }
        }
    }],

    series: [{
        name: '平均收入',
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 15,
        data: salaryArr
    }, {
        name: '数量',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
            normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#14c8d4'},
                        {offset: 1, color: '#43eec6'}
                    ]
                )
            }
        },
        data: numArr
    }, {
        name: '平均收入',
        type: 'bar',
        barGap: '-100%',
        barWidth: 10,
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: 'rgba(20,200,212,0.5)'},
                        {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                        {offset: 1, color: 'rgba(20,200,212,0)'}
                    ]
                )
            }
        },
        z: -12,
        data: salaryArr
    }, {
        name: 'dotted',
        type: 'pictorialBar',
        symbol: 'rect',
        itemStyle: {
            normal: {
                color: '#0f375f'
            }
        },
        symbolRepeat: true,
        symbolSize: [12, 4],
        symbolMargin: 1,
        z: -10,
        data: salaryArr
    }]
}
secondoption = {
    title : {
        text: '学历要求分布饼图',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: eduLevelArr
    },
    series : [
        {
            name: '学历要求',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:eduArr,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}
thirdoption = {
    backgroundColor: '#ffffff',

    title: {
        text: '公司类型分布',
        x:'center',
        textStyle: {
            color: '#000'
        }
    },

    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    visualMap: {
        show: false,
        min:200,
        max:1100,
        inRange: {
            colorLightness: [0, 1]
        }
    },

    series : [
        {
            name:'公司等级',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
           
            data:companyArr.sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(0, 0, 0, 0.7)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(0, 0, 0, 0.7)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#2346e5',
                    shadowBlur: 200
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
}
fourthoption = {
      backgroundColor: '#fff',
        title: {
            text: 'NPM Dependencies'
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
         tooltip : {
        trigger: 'item',
        formatter: function(data){
          return data.data.id ||data.data.name
         }
        },
        series : [
            {
                type: 'graph',
                layout: 'none',
                // progressiveThreshold: 700,
                data: related.nodes.map(function (node) {
                    return {
                        x: 1200*Math.random(),
                        y: 900*Math.random(),
                        id: node.id,
                        name: node.label,
                        symbolSize: node.size*0.3,
                        itemStyle: {
                            normal: {
                                color: '#'+Math.floor(Math.random()*16777215).toString(16)
                            }
                            }
                        }
                    }
                ),
                edges: related.edges.map(function (edge) {
                    return {
                        source: edge.sourceID,
                        target: edge.targetID
                    };
                }),
                label: {
                    emphasis: {
                        position: 'right',
                        show: true,
                        textStyle:{
                          color:'rgb(255,255,255,1)',
                          fontWeight:'bold'
                        }
                    }
                },
                roam: true,
                focusNodeAdjacency: true,
                lineStyle: {
                    normal: {
                        color:'rgb(61,251,207)',
                        //width: 0.5,
                        //curveness: 0.3,
                        //opacity: 0.7
                    }
                }
            }
        ]
    }

  
}
    this.$http.get("shanghai").then((res) => {
      let data = res.body.data
      related  = data.related
      let comparedPosition = data.comparedPosition

      for(var key in comparedPosition){
        positionArr.push(key)
        numArr.push(comparedPosition[key]["num"]*50)
        salaryArr.push(comparedPosition[key]["salary"])
      }
      let education = data.education
      for(var key in education){
        eduLevelArr.push(key)
        eduArr.push({value:education[key],name:key})
      }
      let company = data.company
      for(var key in company){
        companyLevelArr.push(key)
        companyArr.push({value:company[key],name:key})
      }
     console.log(eduArr)
      setOptions(numArr,salaryArr,positionArr)
      let myOneChart = echarts.init(document.getElementById('graphOne'));
      myOneChart.setOption(firstoption)
      let myTwoChart = echarts.init(document.getElementById('graphTwo'));
      myTwoChart.setOption(secondoption)
      let myThreeChart = echarts.init(document.getElementById('graphThree'));
      myThreeChart.setOption(thirdoption)
      let myFourChart = echarts.init(document.getElementById('graphFour'));
      myFourChart.setOption(fourthoption)
    } ,(res) => {
    console.log("错误")

    })
     
    
    },
    methods: {
    }
  }
</script>
<style>
  .right-part{
    margin:0px;
    padding:0px;
    margin-left:300px;
    text-align: center;
  }
  .right{
    padding-top:100px;
  }
  .right h1{

    color: #222A35;
  }

  form{
    margin-top:60px;
  }
  .input-box {
    width: 550px;
    margin: 100px auto;
    text-align: left;
  }
  .input-box label{
    display: inline-block;
    font-size:24px;

  }

  .input{
    margin-left:50px;
    transition: all 2s;
    width:250px;
    height:40px;
    border-radius: 20px;
    border:4px solid #222A35;
    outline: none;
    padding-left:20px;
    font-size:28px;
  }
  .input:focus{
    width:400px;
  }
  .btn{
    width:200px;
    height:40px;
    background:#00B38A;
    font-size:18px;
    color:white;
    border:none;
    border-radius:20px;
  }
  .graph{
    margin:20px auto;
  }
</style>

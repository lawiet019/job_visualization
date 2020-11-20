<template>
  <div>
      <h1>php岗位分析</h1>
      <div id="graphOne" width="800" height="800" style="width:800px;height:800px" class="graph"></div>
      <div id="graphTwo" width="800" height="800" style="width:800px;height:800px" class="graph"></div>

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
    let firstoption,secondoption
    let positionArr
    let related
    let that = this
    function setOptions(){
    firstoption = {
    title: {
        text: 'php职位分布图',
        subtext: '来自拉勾网',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data:['职位数量']
    },
    visualMap: {
        min: 0,
        max: 3543,
        left: 'left',
        top: 'bottom',
        text: ['高','低'],           // 文本，默认为数值文本
        calculable: true
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    series: [
        {
            name: '职位数量',
            type: 'map',
            mapType: 'china',
            roam: false,
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data:positionArr
        }
    ]
}
secondoption = {
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
                        symbolSize: node.size*0.05,
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
                        color:'yellow',
                        width: 3,
                        //curveness: 0.3,
                        //opacity: 0.7
                    }
                }
            }
        ]
    }
  
    }
    this.$http.get("china").then((res) => {
        let chinaJson = res.body.data
        echarts.registerMap('china', chinaJson);
        that.$http.get("php").then(res => {
          let front = res.body.data
          positionArr = front["geo"]
          related = front["related"]
          console.log(positionArr)
          setOptions()
          let myOneChart = echarts.init(document.getElementById('graphOne'));
          myOneChart.setOption(firstoption)
          let myTwoChart = echarts.init(document.getElementById('graphTwo'));
          myTwoChart.setOption(secondoption)

      })
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

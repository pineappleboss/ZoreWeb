<template>
  <div>
    <Card width='600' style=" text-align: center">
      <img src="@/assets/images/backgroud.jpg"></img>
      <Row>
        <i-col>
          <Button icon="logo-github">clone 代码</Button>
        </i-col>
      </Row>
    </Card>
   <h1>更新记录</h1>
      <Timeline v-for="item in timeline" :key="item.content">
          <TimelineItem >
            <card>
              <p class="time">{{item.time}}</p>
              <p class="content">{{item.content}}</p>
            </card>
              
          </TimelineItem>
      </Timeline>
  </div>
  
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {  
       timeline:[
         {
          time:'2020年10月2日',
          content:'搭建框架'
         },
         {
          time:'2020年10月3日',
          content:'修改书籍详情'
         },
         {
          time:'2020年10月5日',
          content:'新增文件上传'
         },
         {
          time:'2020年10月7日',
          content:'修改UI界面'
         },
         {
          time:'2020年12月5日',
          content:'完善权限系统'
         }
       ] 
      
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>

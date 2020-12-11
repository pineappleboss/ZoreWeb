<template>
  <div>
    <Card>

    </Card>
    <Card style="margin-left:10px">
        <Poptip trigger="hover" v-for="item in book" :title="item.publish" :content="item.dicribre" style="margin-left:20px">
        <Card style="width:160px ; height:180px;">
        <img :src="item.imgUrl" style="width:128px;height:148px"></img>
        </Card>
        <Row>{{item.price}}</Row>
        <Row>{{item.publish}}</Row>
        </Poptip>
    </Card>
  </div>
</template>
<script>
export default {
  name: 'level_2_1',
  data(){
    return  {
      book :[
        {
          imgUrl:'https://img13.360buyimg.com/n1/s200x200_jfs/t1/84719/15/5445/198111/5dede470E36572948/8f1e9633c1aa9d97.jpg',
          price:'$200',
          publish:'机械工业出版社',
          dicribre:'这书非常厉害'
        },{
          imgUrl:'https://img13.360buyimg.com/n1/s200x200_jfs/t1/84719/15/5445/198111/5dede470E36572948/8f1e9633c1aa9d97.jpg',
          price:'$200',
          publish:'机械工业出版社',
          dicribre:'话不多说，快上车'
        }
      ]
    }
  }
}
</script>

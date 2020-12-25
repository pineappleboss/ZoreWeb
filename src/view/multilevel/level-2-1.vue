<template>
  <div>
    <Card>
      <Row justify="center">
        <i-col>
          <Button type="success" @click="editBook('')">添加</Button>
        </i-col>
      </Row>
    </Card>
    <Card style="margin-left:10px;height:700px">
      <Poptip
        width='400'
        word-wrap
        trigger="hover"
        v-for="item in book"
        :title="item.title"
        :content="item.abs"
        :key="item.id"
        style="margin-left:20px"
      >
        <Card style="width:160px ; height:180px;">
          <img :src="item.cover" style="width:128px;height:148px" @click="editBook(item.id)" ></img>
        </Card>
        <Row>{{item.press}}</Row>
        <Row>{{item.title}}</Row>
        <Row>作者：{{item.author}}</Row>
        
      </Poptip>
    </Card>
    <Modal :value="modalFlag" @on-ok="submit" @on-cancel="missSubmit" title="修改书籍信息">
      <Form :rules="bookRule" :model="bookEditData">
        <FormItem label="书名" prop="title">
          <Input v-model="bookEditData.title"></Input>
        </FormItem>
        <FormItem label="价格" prop="press">
          <Input v-model="bookEditData.press"></Input>
        </FormItem>
        <FormItem label="出版社" prop="publish">
          <Input v-model="bookEditData.publish"></Input>
        </FormItem>
        <FormItem label="详情" prop="abs">
          <Input v-model="bookEditData.abs"></Input>
        </FormItem>
        <FormItem label="封面" prop="cover">
          <Input v-model="bookEditData.cover"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { setToken, getToken } from "@/libs/util";
export default {
  name: "level_2_1",
  data() {
    return {
      bookRule: {
        cover: [{ type: "string", message: "", trigger: "blur" }],
        press: [{ required: true, message: "", trigger: "blur" }],
        publish: [{ required: true, message: "", trigger: "blur" }],
        abs: [],
        title: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      modalFlag: false,
      bookEditData: {
        id:'',
        cover: "",
        press: "",
        publish: "",
        abs: "",
        title:'',
      },
      book: [],
    };
  },
  methods: {
    cleanData() {
      this.bookEditData={}
    },
    //加载页面数据
    loadData() {
      this.$axios({
        url: "/api/book",
        method: "get",
        headers: { Authorization: getToken() },
      }).then(
        (resp) => {
          if (resp.data.statusCode === 200) {
            this.book = resp.data.data;
          }
        },
        () => {}
      );
    },
    //获取修改数据
    editBook(id) {
      this.modalFlag = true;
      if (id != '') {
        this.$axios({
          url: "/api/book?id=" + id,
          method: "get",
          headers: { Authorization: getToken() },
        }).then(
          (resp) => {
            if (resp.data.statusCode === 200) {
              this.bookEditData = resp.data.data[0];
            }
          },
          () => {}
        );
      }
    },
    //提交数据
    submit() {
      this.$axios({
        url: "/api/book",
        method: "post",
        data: this.bookEditData,
        headers: { Authorization: getToken() },
      }).then(
        (resp) => {
          if (resp.data.statusCode === 200) {
            this.$Message.success("成功");
            this.loadData();
            this.missSubmit();
          } else {
            this.missSubmit();
          }
        },
        () => {}
      );
    },
    missSubmit() {
      this.modalFlag = false;
      this.cleanData();
    },
  },
  created() {
    this.loadData();
  },
};
</script>

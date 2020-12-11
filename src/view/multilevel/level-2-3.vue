<template>
  <div>
    <Table border :columns="tableColumns" :data="tableData"></Table>
    <Page :total="total" show-sizer :page-size="pageSize" :current="page" @on-change="setPage"/>
    <Modal :value="modalFlag"
    title="修改用户"
    @on-ok="missSubmit"
    @on-cancel="submit">
    <Tabs>
      <TabPane label="基本信息" >
        <Form :model="baseMessage" label-position="left" :label-width="100">
          <FormItem label="用户名">
              <Input v-model="baseMessage.username"></Input>
          </FormItem>
          <FormItem label="姓名">
              <Input v-model="baseMessage.name"></Input>
          </FormItem>
          <FormItem label="邮箱">
              <Input v-model="baseMessage.Email"></Input>
          </FormItem>
          <FormItem label="密码">
              <Input v-model="baseMessage.password"></Input>
          </FormItem>
          <FormItem label="确认密码">
              <Input v-model="baseMessage.confirmpassword"></Input>
          </FormItem>
        </Form>
    </TabPane>
     <TabPane label="用户角色">标签一的内容</TabPane>
     <TabPane label="用户权限">
       <AuthTree>
      </AuthTree>
    </TabPane>
    </Tabs>
     
    </Modal>
  </div>
</template>
<script>
import AuthTree from "@/components/authTree/authTree.vue"
export default {
  name: "level_2_3",
  components:{AuthTree},
  data() {
    return {
      page:1,
      pageSize:10,
      total:10,
      modalFlag:false,
      baseMessage:{
        username:'',
        name:'',
        Email:'',
        password:'',
        confirmpassword:'',
      },
      tableColumns: [
        {
          title: "用户名",
          key: "username",
        },
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "角色",
          key: "role",
        },
        {
          title: "操作",
          key: "action",
          render: (h, param) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size:"small",
                    style: {
                        marginRight: '5px'
                    },
                  },
                  on: {
                    click: () => {
                      this.modalFlag=true;
                      this.editUser(param.row.id);
                    },
                  },
                },
                "修改"
              ),
              h("Button", {
                props: {
                  type: "error",
                  size:"small",
                  style: {
                        marginRight: '5px'
                    },
                },
                on: {
                  click: () => {
                  },
                },
              },
              "删除"),
            ]);
          },
        },
      ],
      tableData: [
      { username: "ss", name: "cdsa", role: "cds" },
      { username: "ss", name: "cdsa", role: "cds" },
      { username: "ss", name: "cdsa", role: "cds" }
      ],
    };
  },
  methods:{
    //设置page
    setPage(page){
      this.page=page;
    },
    //取消时清空这些数据或恢复原来的状态
    cleanData(){
      this.modalFlag=false;
    },
    missSubmit(){
      this.cleanData();
    },
    submit(){
      this.cleanData();
    },
    //获取此行的数据
    editUser(id){
      this.modalFlag=true;
      this.$axios("/api/user/"+id,"get").then((resp)=>{
        if(resp.data.statusCode===200){
          this.baseMessage=resp.data.data;
        }else{
          this.$Message.error('数据加载失败')
        }
      },()=>{

      })
    },
    //加载表格数据
    loadTableData(){
      this.$axios("/api/user","get").then((resp)=>{
        if(resp.data.statusCode===200){
          this.tableData=resp.data.data;
          }else{
            this.$Message.error('数据加载失败')
          }  
      },
      ()=>{

      })
    }
  },
  created(){
    this.loadTableData();
  }
};
</script>

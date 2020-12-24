<template>
  <div>
    <Table border :columns="tableColumns" :data="tableData"></Table>
    <Page :total="total" show-sizer :page-size="pageSize" :current="page" @on-change="setPage" />
    <Modal :value="modalFlag" title="修改用户" @on-ok="submit" @on-cancel="missSubmit">
      <Tabs>
        <TabPane label="基本信息">
          <Form :model="baseMessage" label-position="left" :label-width="100">
            <FormItem label="用户名">
              <Input v-model="baseMessage.userName"></Input>
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
        <TabPane label="用户角色">
          <Checkbox
          <CheckboxGroup v-model="userRole" @on-change="checkAlluserRole">
              <Checkbox v-for='item in userRoles' :label='item.id' :key='item.id'>
                {{item.name}}
              </Checkbox>
          </CheckboxGroup>
        </TabPane>  
        <TabPane label="用户权限">
          <AuthTree ref="authTree" :treeData='sonTreeData'>
          </AuthTree>
        </TabPane>
      </Tabs>
    </Modal>
  </div>
</template>
<script>
import AuthTree from "@/components/authTree/authTree.vue";
import { setToken, getToken } from "@/libs/util";
export default {
  name: "level_2_3",
  components: { AuthTree },
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 10,
      modalFlag: false,
      treeData:[],
      userRoles:[],
      userRole:[],
      sonTreeData:[],
      baseMessage: {
        userName: "",
        name: "",
        Email: "",
        password: "",
        accesses:'',
        confirmpassword: "",
      },
      tableColumns: [
        {
          title: "用户名",
          key: "userName",
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
                    size: "small",
                    style: {
                      marginRight: "5px",
                    },
                  },
                  on: {
                    click: () => {
                      this.modalFlag = true;
                      this.editUser(param.row.id);
                    },
                  },
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    style: {
                      marginRight: "5px",
                    },
                  },
                  on: {
                    click: () => {},
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      tableData: [],
    };
  },
  methods: {
    //设置page
    setPage(page) {
      this.page = page;
    },
    //取消时清空这些数据或恢复原来的状态
    cleanData() {
      this.userRole = [];
      this.modalFlag = false;
    },
    missSubmit() {
      this.cleanData();
    },
    //目录树处理
    checkoutTreeData(treeData){
    this.baseMessage.access.push(treeData.url)
    },
    submit() {
      this.baseMessage.perssion = '';
      let thisAccess = this.$refs.authTree.getData();
      for(let i=0;i<thisAccess.length;i++){
        
        this.baseMessage.perssion = this.baseMessage.perssion===''?thisAccess[i].url:(this.baseMessage.perssion +','+thisAccess[i].url)
      }
      this.baseMessage.role=[];
      for(let i=0;i<this.userRole.length;i++){
        this.baseMessage.role.push({'id':this.userRole[i]});
      }
      this.$axios({
        url: "/api/user",
        method: "put",
        data:this.baseMessage,
        headers: { Authorization: getToken() },
      }).then(
        (resp) => {
          if (resp.data.statusCode === 200) {
            this.$Message.success("用户信息修改成功");
          } else {
            this.$Message.error("用户信息修改失败");
          }
        },
        () => {}
      );
      this.cleanData();
    },
    //获取此行的数据
    editUser(id) {
      this.getUserMessage(id);
    },
    
    //加载表格数据
    loadTableData() {
      this.$axios({
        url: "/api/user",
        method: "get",
        headers: { Authorization: getToken() },
      }).then(
        (resp) => {
          if (resp.data.statusCode === 200) {
            this.tableData = resp.data.data;
          } else {
            this.$Message.error("数据加载失败");
          }
        },
        () => {}
      );
    },
    //获取行详细信息
    getUserMessage(id){
      this.modalFlag = true;
      this.$axios({
        url: "/api/user/"+id,
        method: "get",
        headers: { Authorization: getToken() }}).then(
        (resp) => {
          if (resp.data.statusCode === 200) {
            this.baseMessage = resp.data.data;
            this.getUserRoles(id)
            let role=this.baseMessage.role;
            for(let i=0;i<role.length;i++){
              this.userRole.push(role[i].id) ;
            }
            this.getPersission(id);

          } else {
            this.$Message.error("数据加载失败");
          }
        },
        () => {}
      );
    },
    //获取行权限信息
    getUserRoles(id){
      this.$axios({
        url: "/api/role",
        method: "get",
        headers: { Authorization: getToken() },
      }).then(
        (resp) => {
          if (resp.data.statusCode === 200) {
            this.userRoles = resp.data.data;
          } else {
            this.$Message.error("数据加载失败");
          }
        },
        () => {}
      );
    },
    //加载菜单权限控制
    getPersission(id){
      this.$axios( {
        url:'/api/persission/'+id,
        method:'get',
        headers: { Authorization: getToken() }
      }).then((resp)=>{
        if(resp.data.statusCode === 200){
          this.sonTreeData=resp.data.data        }
      },
      ()=>{})
    },
    checkAlluserRole(){
    }
  },
  created() {
    this.loadTableData();
  },
};
</script>

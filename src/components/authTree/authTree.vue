<template>
  <Tree :data="treeData" show-checkbox></Tree>
</template>

<script>
export default {
  data() {
    return {
      treeData: [
        {
          title: "parent 1",
          expand: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1",
                },
                {
                  title: "leaf 1-1-2",
                },
              ],
            },
            {
              title: "parent 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1",
                },
                {
                  title: "leaf 1-2-1",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods:{
    loadDatas() {
      this.$axios("/api/menu", "get").then(
        (resp) => {
          if (resp.data.statusCode === 200) {
            this.data = this.forMart(resp.data.data);
          } else {
            this.$Message.error("数据初始化失败");
          }
        },
        () => {}
      );
    },
    forMart(data) {},
  },
  created() {
    this.loadDatas();
  },
};
</script>

<style>
</style>
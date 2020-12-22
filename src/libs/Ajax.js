import { setToken, getToken } from "@/libs/util";
    Vue.prototype.$get = (url, success, error) => {
        this.$axios({
            url: url,
            method: 'get',
            headers: { Authorization: getToken()}
        }).then(success, error)
    }
    Vue.prototype.$post = (url, data, success, error) => {
        this.$axios({url:url,
        data:data,
        method:'post',
        headers: { Authorization: getToken() }
        }).then(success,error)
    }
    Vue.prototype.$put= (url, data, success, error) => {
        this.$axios({url:url,
        data:data,
        method:'post',
        headers: { Authorization: getToken() }
        }).then(success,error)
    }
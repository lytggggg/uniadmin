<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validateTrigger="bind">
      <uni-forms-item name="name" label="姓名">
        <uni-easyinput placeholder="姓名" v-model="formData.name"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="sex" label="性别">
        <uni-easyinput placeholder="性别" v-model="formData.sex"></uni-easyinput>
      </uni-forms-item>
	  <uni-forms-item name="ID" label="工号">
	    <uni-easyinput placeholder="工号" v-model="formData.ID"></uni-easyinput>
	  </uni-forms-item>
      <uni-forms-item name="tel" label="联系方式">
        <uni-easyinput placeholder="联系方式" v-model="formData.tel"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="enterprise_in" label="所属单位">
        <uni-easyinput placeholder="所属单位" v-model="formData.enterprise_in"></uni-easyinput>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" style="width: 100px;" @click="submit">提交</button>
        <navigator open-type="navigateBack" style="margin-left: 15px;">
          <button class="uni-button" style="width: 100px;">返回</button>
        </navigator>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../../js_sdk/validator/user.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'user';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.includes(key)) {
        result[key] = validator[key]
      }
    }
    return result
  }

  

  export default {
    data() {
      let formData = {
        "name": "",
        "sex": "",
		"ID":"",
        "tel": "",
        "enterprise_in": ""
      }
      return {
        formData,
        formOptions: {},
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            title: '新增成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      }
    }
  }
</script>

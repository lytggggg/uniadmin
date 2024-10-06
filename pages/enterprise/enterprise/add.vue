<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validateTrigger="bind">
      <uni-forms-item name="USCC" label="统一标识">
        <uni-easyinput placeholder="统一标识" v-model="formData.USCC"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="enterprise_Name" label="单位名称">
        <uni-easyinput placeholder="单位名称" v-model="formData.enterprise_Name"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="enterprise_Address" label="单位地址">
        <uni-easyinput placeholder="单位地址" v-model="formData.enterprise_Address"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="enterprise_Leader" label="单位领导人">
        <uni-easyinput placeholder="单位领导人" v-model="formData.enterprise_Leader"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="enterprise_type" label="单位类型">
        <uni-easyinput placeholder="单位类型" v-model="formData.enterprise_type"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="enterprise_nature" label="单位性质">
        <uni-easyinput placeholder="单位性质" v-model="formData.enterprise_nature"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="region_name" label="所在区县">
        <uni-easyinput placeholder="所在区县" v-model="formData.region_name"></uni-easyinput>
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
  import { validator } from '../../../js_sdk/validator/enterprise.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'enterprise';

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
        "USCC": "",
        "enterprise_Name": "",
        "enterprise_Address": "",
        "enterprise_Leader": "",
        "enterprise_type": "",
        "enterprise_nature": "",
        "region_name": ""
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

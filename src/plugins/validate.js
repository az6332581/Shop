import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_TW'
import Vue from 'vue'
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_TW', {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须與密碼相同`
  },
  attributes: {
    phone: '手機號碼',
    code: '驗證碼',
    password: '密碼',
    password1: '確認密碼',
    isCheck: '協議'
  }
})

VeeValidate.Validator.extend('agree', {
  validate: value => {
    return value
  },
  getMessage: field => field + '必須同意'
})


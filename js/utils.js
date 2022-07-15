// 封装表单验证通用函数

/**
 *
 *  对某个表单进行验证的构造函数
 * @class FieldValidator
 */
class FieldValidator {
  /**
   *构造器
   * @param {String} txtId 文本框的Id
   * @param {Function} validatorFunc 验证规则函数，当需要文本框验证时，会调用改函数，如果验证不通过则返回数据，否则不操作
   * @memberof FieldValidator
   */
  constructor(txtId, validatorFunc) {
    // 获取当前操作的input元素
    this.input = $("#" + txtId);
    // 获取验证错误时，input的下一个兄弟元素p
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;
    // input框失去焦点时验证
    this.input.onblur = () => {
      this.validate();
    };
  }
  /**
   * 验证，验证成功返回true，验证失败返回false
   */
  async validate() {
    const err = await this.validatorFunc(this.input.value);
    if (err) {
      // 有错误
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }
  /**
   *
   *对传入的所有验证器进行统一的验证，如果所有验证通过，则返回true，否则返回false
   * @static
   * @param {*} validators
   * @memberof FieldValidator
   */
  static async validateAll(...validators) {
    const proms = validators.map((v) => v.validate());
    const results = await Promise.all(proms);
    return results.every(r => r);
  }
}



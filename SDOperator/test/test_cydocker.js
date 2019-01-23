var cydocker = require('../toolkit/cy_docker');
var sdtoolkit = require('../toolkit/sd_toolkit');

/* 创建测试 */
// var rst = cydocker.container_create('','','','','');
// console.log(rst);

/* 查找 */
var rst = cydocker.container_select("6ef847562758");
console.log(rst);

/* 删除 */
// var rst = cydocker.container_remove("478646978d8647da150f");
// console.log(rst);

/* 查找所有容器 */
// var rst = cydocker.container_selectAll();
// console.log(rst);

/* 删除所有容器 */
// var rst = cydocker.container_removeAll();
// console.log(rst);

// var tmpStr = sdtoolkit.unicode_en("123");
// console.log(tmpStr);
// var tmpStr1 = sdtoolkit.unicode_de(tmpStr);
// console.log(tmpStr1);
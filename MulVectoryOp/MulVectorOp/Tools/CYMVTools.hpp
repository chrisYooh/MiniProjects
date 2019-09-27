//
//  CYMVTools.hpp
//  MulVectorOp
//
//  Created by Chris Yang on 2019/9/27.
//  Copyright © 2019 Chris. All rights reserved.
//

#ifndef CYMVTools_hpp
#define CYMVTools_hpp

#include <stdio.h>
#include <vector>

/* 创建数据 */
float * cymv_create_full(std::vector<int> shape, float value);

/* 打印 */
void cymv_print(float *pVal, std::vector<int> shape);

/* 计算 */
void cymv_add(float *dst,
              float *src0,
              std::vector<int> shape0,
              float *src1,
              std::vector<int> shape1);

#endif /* CYMVTools_hpp */

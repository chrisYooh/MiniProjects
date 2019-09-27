//
//  CYMVTools.cpp
//  MulVectorOp
//
//  Created by Chris Yang on 2019/9/27.
//  Copyright © 2019 Chris. All rights reserved.
//

#include "CYMVTools.hpp"

float * cymv_create_full(std::vector<int> shape, float value) {
    
    int size = 1;
    for (int i = 0; i < shape.size(); i++) {
        size *=shape[i];
    }
    
    float *pVal = (float *)malloc(size * sizeof(float));
    for (int i = 0; i < size; i++) {
        pVal[i] = value;
    }
    
    return pVal;
}

void cymv_print(float *pVal, std::vector<int> shape) {
    
    int size = 1;
    for (int i = 0; i < shape.size(); i++) {
        size *=shape[i];
    }

    for (int i = 0; i < size; i++) {
        printf("%.4f   ", pVal[i]);
        
        int stride = 1;
        for (int j = (int)(shape.size()) - 1; j >= 0; j--) {
            stride *= shape[j];
            if ((i + 1) % stride == 0) {
                printf("\n");
            }
        }
    }
}

static void __add(int dimTag,
                  float *pC, std::vector<int> &rev_stepCs,
                  float *pA, std::vector<int> &rev_stepAs, std::vector<int> &dimAs,
                  float *pB, std::vector<int> &rev_stepBs, std::vector<int> &dimBs) {
    
    int dimNum = (int)dimAs.size();
    
    int curDimA = dimAs[dimTag];
    int curDimB = dimBs[dimTag];
    int curDimC = curDimA > curDimB ? curDimA : curDimB;
    
    int curStepA = rev_stepAs[dimNum - 1 - dimTag];
    int curStepB = rev_stepBs[dimNum - 1 - dimTag];
    int curStepC = rev_stepCs[dimNum - 1 - dimTag];
    
    float *tmppa = pA;
    float *tmppb = pB;
    float *tmppc = pC;
    for (int i = 0; i < curDimC; i++) {
        
        if (dimTag == dimNum - 1) {
            *tmppc = *tmppa + *tmppb;
        } else {
            __add(dimTag + 1,
                  tmppc, rev_stepCs,
                  tmppa, rev_stepAs, dimAs,
                  tmppb, rev_stepBs, dimBs);
        }
        
        tmppc += curStepC;
        tmppa += curStepA;
        tmppb += curStepB;
    }
}

void cymv_add(float *dst,
              float *src0,
              std::vector<int> shape0,
              float *src1,
              std::vector<int> shape1) {
    
    if (shape0.size() != shape1.size()) {
        printf("维度不等，无法计算");
        return;
    }
    
    /* 小维度在前，高维度在后 */
    std::vector<int> step0;
    std::vector<int> step1;
    std::vector<int> stepOut;
    
    int tmpStep0 = 1;
    int tmpStep1 = 1;
    int tmpStepOut = 1;
    for (int i = (int)(shape0.size()) - 1; i >= 0 ; i--) {
        
        if (1 == shape0[i]) {
            step0.push_back(0);
        } else {
            step0.push_back(tmpStep0);
        }
        if (1 == shape1[i]) {
            step1.push_back(0);
        } else {
            step1.push_back(tmpStep1);
        }
        stepOut.push_back(tmpStepOut);
        
        tmpStep0 *= shape0[i];
        tmpStep1 *= shape1[i];
        int maxVal = shape0[i] > shape1[i] ? shape0[i] : shape1[i];
        tmpStepOut *= maxVal;
    }
    
    __add(0,
          dst, stepOut,
          src0, step0, shape0,
          src1, step1, shape1);
}




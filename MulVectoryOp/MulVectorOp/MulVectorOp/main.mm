//
//  main.m
//  MulVectorOp
//
//  Created by Chris Yang on 2019/9/27.
//  Copyright © 2019 Chris. All rights reserved.
//

#import <Foundation/Foundation.h>

#include "CYMVTools.hpp"

int main(int argc, const char * argv[]) {
    
    std::vector<int> shapeC = std::vector<int>{2,3,4};
    std::vector<int> shapeA = std::vector<int>{2,3,4};
    std::vector<int> shapeB = std::vector<int>{2,3,4};
    
    float *tmpC = cymv_create_full(shapeC, 0);
    
    float *tmpA1 = cymv_create_full(shapeA, 1);
    float *tmpB1 = cymv_create_full(shapeB, 2);
    cymv_add(tmpC, tmpA1, shapeA, tmpB1, shapeB);
    cymv_print(tmpC, shapeC);
    
    shapeA = std::vector<int>{1,3,4};
    shapeB = std::vector<int>{2,3,4};
    float *tmpA2 = cymv_create_full(shapeA, 1);
    float *tmpB2 = cymv_create_full(shapeB, 2);
    cymv_add(tmpC, tmpA2, shapeA, tmpB2, shapeB);
    cymv_print(tmpC, shapeC);

    shapeA = std::vector<int>{1,3,4};
    shapeB = std::vector<int>{2,1,1};
    float *tmpA3 = cymv_create_full(shapeA, 1);
    float *tmpB3 = cymv_create_full(shapeB, 2);
    cymv_add(tmpC, tmpA3, shapeA, tmpB3, shapeB);
    cymv_print(tmpC, shapeC);
    
    return 0;
}

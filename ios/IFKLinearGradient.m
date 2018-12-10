#import "IFKLinearGradient.h"
#import <React/RCTAssert.h>

@implementation IFKLinearGradient
  
+ (void)initialize
{
  [self initializeWithGradientClass:[IFKLinearGradient class]
                        displayName:@"Linear Gradient (max 5 colors)"];
}
  
+ (CIKernel *)filterKernel:(int)colorsAmount
{
  static NSArray<CIKernel *> *kernels;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    kernels = [self loadKernels:[IFKLinearGradient class]];
  });
  
  return kernels[colorsAmount - 1];
}

- (CIVector *)inputStart
{
  if (_inputStart) {
    return _inputStart;
  }
  
  return [CIVector vectorWithCGPoint:self.inputExtent
          ? CGPointMake(self.inputExtent.X, self.inputExtent.Y)
          : CGPointZero];
}

- (CIVector *)inputEnd
{
  if (_inputEnd) {
    return _inputEnd;
  }
  
  return [CIVector vectorWithCGPoint:self.inputExtent
          ? CGPointMake(self.inputExtent.X + self.inputExtent.Z, self.inputExtent.Y)
          : CGPointZero];
}

- (CIImage *)outputImage
{
  if (self.inputExtent == nil) {
    return nil;
  }

  int inputAmount = [self.inputAmount intValue];
  
  RCTAssert(inputAmount > 0 && inputAmount <= 5,
            @"ImageFilterKit: IFKLinearGradient takes only up to 5 colors, submitted %i colors.",
            inputAmount);
  
  CIKernel *kernel = [IFKLinearGradient filterKernel:inputAmount];
  
  NSArray *args = inputAmount == 1
    ? @[self.inputColor0,
        self.inputStop0,
        self.inputStart,
        self.inputEnd]
    : inputAmount == 2
    ? @[self.inputColor0,
        self.inputStop0,
        self.inputColor1,
        self.inputStop1,
        self.inputStart,
        self.inputEnd]
    : inputAmount == 3
    ? @[self.inputColor0,
        self.inputStop0,
        self.inputColor1,
        self.inputStop1,
        self.inputColor2,
        self.inputStop2,
        self.inputStart,
        self.inputEnd]
    : inputAmount == 4
    ? @[self.inputColor0,
        self.inputStop0,
        self.inputColor1,
        self.inputStop1,
        self.inputColor2,
        self.inputStop2,
        self.inputColor3,
        self.inputStop3,
        self.inputStart,
        self.inputEnd]
    : @[self.inputColor0,
        self.inputStop0,
        self.inputColor1,
        self.inputStop1,
        self.inputColor2,
        self.inputStop2,
        self.inputColor3,
        self.inputStop3,
        self.inputColor4,
        self.inputStop4,
        self.inputStart,
        self.inputEnd];
  
  return [kernel applyWithExtent:[self.inputExtent CGRectValue]
                     roiCallback:^CGRect(int index, CGRect destRect) {
                       return destRect;
                     } arguments:args];
}

@end
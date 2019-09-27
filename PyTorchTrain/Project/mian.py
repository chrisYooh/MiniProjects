# 1 http://blog.itpub.net/31555081/viewspace-2286683/

import cydata as cydata
import torch
import torchvision

trainloader = cydata.cy_train_loader();
testloader = cydata.cy_test_loader();
classes = cydata.cy_classes();

# 4
import net.net as NET
net = NET.cy_net()

# 5
import torch.nn as nn
import torch.optim as optim
criterion = nn.CrossEntropyLoss()
optimizer = optim.SGD(net.parameters(), lr=0.001, momentum=0.9)

# 6
__log_duration = 2000;
__pt_file_prefix = './out_weight/cy_epoch_'
__pt_file_suffix = '.pt'

for epoch in range(2):  # 多次循环遍历数据集
   running_loss =0.0
   for i, data in enumerate(trainloader, 0):

       # 获取输入
       inputs, labels = data

       # 参数梯度置零
       optimizer.zero_grad()

       # 前向+ 反向 + 优化
       outputs = net(inputs)
       loss = criterion(outputs, labels)
       loss.backward()
       optimizer.step()

       # 输出统计
       running_loss += loss.item()

       if i % __log_duration == (__log_duration - 1):
           print('[%d, %5d] loss: %.3f'% (epoch +1, i + 1, running_loss / __log_duration))
           running_loss =0.0

   torch.save(net, __pt_file_prefix + str(epoch) + __pt_file_suffix)

print('Finished Training')

# 9
correct =0
total =0
with torch.no_grad():
   for data in testloader:
       images, labels = data
       outputs = net(images)
       _, predicted = torch.max(outputs.data, 1)
       total += labels.size(0)
       correct += (predicted == labels).sum().item()

print('Accuracy of the network on the 10000 test images: %d %%'% (100 * correct / total))

# 10
class_correct = list(0.for i in range(10))
class_total = list(0.for i in range(10))
with torch.no_grad():

   for data in testloader:
       images, labels = data
       outputs = net(images)
       _, predicted = torch.max(outputs, 1)
       c = (predicted == labels).squeeze()

       for i in range(4):
           label = labels[i]
           class_correct[label] += c[i].item()
           class_total[label] +=1

for i in range(10):
   print('Accuracy of %5s : %2d %%'% (classes[i], 100* class_correct[i] / class_total[i]))
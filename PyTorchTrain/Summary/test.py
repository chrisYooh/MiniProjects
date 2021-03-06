# 1 http://blog.itpub.net/31555081/viewspace-2286683/
import torch
import torchvision
import torchvision.transforms as transforms

# 2
transform = transforms.Compose(
   [transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))]
    # transforms.Normalize((0, 0, 0), (1, 1, 1))]
)

trainset = torchvision.datasets.CIFAR10(root='./data', train=True, download=True, transform=transform)
trainloader = torch.utils.data.DataLoader(trainset, batch_size=4, shuffle=True, num_workers=2)

testset = torchvision.datasets.CIFAR10(root='./data', train=False, download=True, transform=transform)
testloader = torch.utils.data.DataLoader(testset, batch_size=4, shuffle=False, num_workers=2)

classes = ('plane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck')

# 3
import matplotlib.pyplot as plt
import numpy as np

# 图像显示函数
def imshow(img):
   img = img / 2 + 0.5     # 非标准的（unnormalized）
   npimg = img.numpy()
   plt.imshow(np.transpose(npimg, (1, 2, 0)))
   plt.show()

# 得到一些随机图像
dataiter = iter(trainloader)
images, labels = dataiter.next()

# 显示图像
spriteImg = torchvision.utils.make_grid(images);
imshow(spriteImg)
torchvision.utils.save_image(spriteImg, "test.png");

# 打印类标
print(' '.join('%5s'% classes[labels[j]] for j in range(4)))

# 4
import torch.nn as nn
import torch.nn.functional as F

class Net(nn.Module):
   def __init__(self):
       super(Net, self).__init__()
       self.conv1 = nn.Conv2d(3, 6, 5)
       self.pool = nn.MaxPool2d(2, 2)
       self.conv2 = nn.Conv2d(6, 16, 5)
       self.fc1 = nn.Linear(16*5*5, 120)
       self.fc2 = nn.Linear(120, 84)
       self.fc3 = nn.Linear(84, 10)

   def forward(self, x):
       x =self.pool(F.relu(self.conv1(x)))
       x =self.pool(F.relu(self.conv2(x)))
       x = x.view(-1, 16*5*5)
       x = F.relu(self.fc1(x))
       x = F.relu(self.fc2(x))
       x =self.fc3(x)

       return x

net = Net()

# 5
import torch.optim as optim

criterion = nn.CrossEntropyLoss()
optimizer = optim.SGD(net.parameters(), lr=0.001, momentum=0.9)

# 6
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

       if i % 2000==1999:
           print('[%d, %5d] loss: %.3f'% (epoch +1, i + 1, running_loss /2000))
           running_loss =0.0

   torch.save(net, 'aaa' + str(epoch) + ".pt")
   torch.save(net.state_dict(), 'bbb' + str(epoch) + ".pt")

print('Finished Training')

# 7
dataiter =iter(testloader)
images, labels = dataiter.next()

# 打印图片
imshow(torchvision.utils.make_grid(images))

print('GroundTruth: ', ' '.join('%5s'% classes[labels[j]] for j in range(4)))

# 8
_, predicted = torch.max(outputs, 1)
print('Predicted: ', ' '.join('%5s'% classes[predicted[j]] for j in range(4)))

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
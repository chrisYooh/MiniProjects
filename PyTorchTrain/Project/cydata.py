import torch
import torchvision
import torchvision.transforms as transforms

transform = transforms.Compose(
   [transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))]
    # transforms.Normalize((0, 0, 0), (1, 1, 1))]
)

def cy_train_loader():
    trainset = torchvision.datasets.CIFAR10(root='../data', train=True, download=True, transform=transform)
    trainloader = torch.utils.data.DataLoader(trainset, batch_size=4, shuffle=True, num_workers=2)
    return trainloader

def cy_test_loader():
    testset = torchvision.datasets.CIFAR10(root='../data', train=False, download=True, transform=transform)
    testloader = torch.utils.data.DataLoader(testset, batch_size=4, shuffle=False, num_workers=2)
    return testloader

def cy_classes():
    classes = ('plane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck')
    return classes

def cy_train_sample():
    trainloader = cy_train_loader();
    dataiter = iter(trainloader)
    images, labels = dataiter.next()
    return images, labels

def cy_test_sample():
    testloader = cy_test_loader();
    dataiter = iter(testloader)
    images, labels = dataiter.next()
    return images, labels



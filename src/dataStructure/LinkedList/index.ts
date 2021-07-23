import { defaultEqualsFunction, IEqualsFunction, Node } from '../utils'

export class LinkedList<T> {
  protected count = 0
  protected head: Node<T> | undefined
  constructor(private equals: IEqualsFunction<T> = defaultEqualsFunction) {}

  push(element: T) {
    const node = new Node<T>(element)

    if (this.head == null) {
      this.head = node
    } else {
      let current = this.head
      while (current.next != null) {
        current = current.next
      }
      current.next = node
    }
    this.count++
  }

  insert(element: T, index: number) {
    if (index >= 0 && index <= this.count) {
      const node = new Node<T>(element)
      let current = this.head
      if (index === 0) {
        this.head = node
        node.next = current
      } else {
        const prev = this.getElementByIndex(index - 1) as Node<T>
        current = prev.next
        prev.next = node
        node.next = current
      }
      this.count++
    }
  }

  getElementByIndex(index: number) {
    if (index >= 0 && index <= this.count) {
      let current = this.head
      for (let i = 0; i < index && current != null; i++) {
        current = current.next
      }
      return current
    }
  }

  indexOf(element: T) {
    let current = this.head
    for (let i = 0; i < this.count && current != null; i++) {
      if (this.equals(element, current.element)) {
        return i
      }
    }
    return -1
  }

  remove(element: T) {
    const index = this.indexOf(element)
    this.removeAtIndex(index)
  }

  removeAtIndex(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      if (index === 0) {
        this.head = current!.next
      } else {
        const prev = this.getElementByIndex(index - 1) as Node<T>
        current = prev.next
        prev.next = current!.next
      }
      this.count--
    }
  }

  addAtHead(element: T) {
    this.insert(element, 0)
  }
  addAtTail(element: T) {
    this.push(element)
  }
  addAtIndex(index: number, element: T) {
    this.insert(element, index)
  }
  get(index: number) {
    return this.getElementByIndex(index)?.element ?? -1
  }
  deleteAtIndex(index: number) {
    this.removeAtIndex(index)
  }

  isEmpty() {
    return this.count === 0
  }
  toString() {
    if (this.head == null) {
      return ''
    }
    let objString = this.head.element + ''
    let current = this.head.next
    for (let i = 1; i < this.count && current != null; i++) {
      objString = `${objString},${current.element}`
      current = current.next
    }
    return objString
  }
}
const linkedList = new LinkedList()
linkedList.addAtHead(1)
console.log(
  linkedList,
  `operation addAtHead(1) ${linkedList.toString()}`,
  `result => ${linkedList.toString() === '1'}`
)
linkedList.addAtTail(3)
console.log(
  linkedList,
  `operation addAtTail(3) ${linkedList.toString()}`,
  `result => ${linkedList.toString() === '1,3'}`
)
linkedList.addAtIndex(1, 2) //链表变为1-> 2-> 3
console.log(
  linkedList,
  `operation addAtIndex(1, 2) ${linkedList.toString()}`,
  `result => ${linkedList.toString() === '1,2,3'}`
)
linkedList.get(1) //返回2
console.log(
  linkedList,
  `operation get(1) ${linkedList.toString()}`,
  `result => ${linkedList.get(1) == '2'}`
)
linkedList.deleteAtIndex(1) //现在链表是1-> 3
console.log(
  linkedList,
  `operation deleteAtIndex(1) ${linkedList.toString()}`,
  `result => ${true}`
)
linkedList.get(1)
console.log(
  linkedList,
  `operation get(1) ${linkedList.toString()}`,
  `result => ${linkedList.get(1) == '3'}`
)

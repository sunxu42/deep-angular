### LRU Latest Recently Used

其实就是通过 ListNode 的 prev 和 next 方法形成一个双向的链表
链表的头和尾在一开始就定义好
每次新增就往头后添加数据
每次删除就delete尾前一位数据
每次使用数据就位置调换到头后面
```ts
class ListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // 使用 Map 作为哈希表
    // 初始化双向链表，使用两个哨兵节点 head 和 tail
    this.head = new ListNode(null, null);
    this.tail = new ListNode(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _addNode(node) {
    // 在链表头部添加节点（表示最近使用）
    node.prev = this.head;
    node.next = this.head.next;

    this.head.next.prev = node;
    this.head.next = node;
  }

  _removeNode(node) {
    // 移除链表中的节点
    const prev = node.prev;
    const next = node.next;

    prev.next = next;
    next.prev = prev;
  }

  _moveToHead(node) {
    // 将节点移动到链表头部（表示最近使用）
    this._removeNode(node);
    this._addNode(node);
  }

  get(key) {
    const node = this.cache.get(key);
    if (!node) return -1;

    // 如果节点存在，移动到链表头部
    this._moveToHead(node);
    return node.value;
  }

  put(key, value) {
    let node = this.cache.get(key);

    if (node) {
      // 如果节点存在，更新值并移动到链表头部
      node.value = value;
      this._moveToHead(node);
    } else {
      node = new ListNode(key, value);
      this.cache.set(key, node);
      this._addNode(node);

      if (this.cache.size > this.capacity) {
        // 如果缓存超出容量限制，移除最久未使用的节点（链表尾部）
        const tail = this.tail.prev;
        this._removeNode(tail);
        this.cache.delete(tail.key);
      }
    }
  }
}
```

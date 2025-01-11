let db:IDBDatabase;
export const initIndexDB = () => {
    const request = window.indexedDB.open('account', 2);

    request.onsuccess = e => {
        const target = e.target as IDBOpenDBRequest;
        if (target && target.result) {
            db = target.result;
            console.log('数据库打开成功会执行');
        } else {
            console.error('无法获取数据库实例');
        }
    };

    request.onupgradeneeded = e => {
        const target = e.target as IDBOpenDBRequest;
        if (target && target.result) {
            db = target.result;
            console.log('数据库打开成功会执行');
        } else {
            console.error('无法获取数据库实例');
        }
        db.createObjectStore('myStore', { keyPath: 'id', autoIncrement: true });

        console.log('数据库创建和更新会执行');
    };

    request.onerror = error => {
        console.log('数据库打开失败会执行');
    };
}
export const addDataIndexedDB = (data:any) => {
    const transaction = db.transaction(["myStore"], 'readwrite');
const store = transaction.objectStore("myStore");
        // 3、向仓库添加数据
        let request=store.add(data);

        request.onsuccess = e => {
            console.log('数据添加成功后触发');
        };
        transaction.oncomplete = e => {
            console.log('所有数据添加完毕后触发');
        };
        transaction.onerror = error => {
            console.log('数据添加失败后触发');
        };
}
export const readDataIndexedDB = () => {
    const transaction = db.transaction(["myStore"], 'readwrite');
const store = transaction.objectStore("myStore");
    const request = store.getAll();

  request.onsuccess = (event) => {
    let data: any[] | null = null;
    const target = event.target as IDBRequest<any[]>;
        if (target && target.result) {
            data = target.result;
            console.log('数据库打开成功会执行');
        } else {
            console.error('无法获取数据库实例');
        }
    console.log('Data retrieved:', data);
  };

  request.onerror = (event) => {
    let error = event.target as IDBRequest<any>;
    console.error('Error retrieving data:', error);
  };

  // 监听事务完成事件
  transaction.oncomplete = (event) => {
    console.log('Transaction completed');
  };

  transaction.onerror = (event) => {
    const target = event.target as IDBTransaction;
    if (target && target.error) {
        console.error('事务出错:', target.error);
    } else {
        console.error('事务出错，事件目标为空');
    }
  };
}
export const deleteDataIndexedDB = (key:number) => {
    const request = db.transaction(["myStore"], 'readwrite').objectStore("myStore").delete(key); //key---id值
    request.onsuccess = (e: Event) => { // readyState为done是更新完毕
        const target = e.target as IDBRequest<number>;
        console.log(target.result, target);
        console.log('删除成功', target.result);
    };

    request.onerror = (e: Event) => {
        console.log('删除失败：', e);
        throw new Error('删除失败：' + (e.target as IDBRequest).error);
    };
}
export const fORData = () => {
    let data: IDBValidKey[] =[]
    const transaction = db.transaction(["myStore"], 'readwrite')
    const request=transaction.objectStore("myStore")
    request.openCursor().onsuccess = e => { //readyState为done是更新完毕
        const target = e.target as IDBRequest<IDBCursorWithValue>;
        const cursor = target.result;
        if (cursor) {
            data.push(cursor.key)
            console.log("当前的id值： " + cursor.key + " 和age值 " + cursor.value.age);
            cursor.continue();
        } else {
            console.log("结束遍历",data);
        }

    }
    transaction.onerror = e => {
        console.log('遍历所有值失败：', e);
    }
}
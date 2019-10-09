import { fromEvent, Observable, Subject, of } from 'rxjs';
import { throttleTime, scan, map, first } from 'rxjs/operators'


const btn = document.querySelector('#btn');
//使用RxJS可以隔离状态。
fromEvent(btn, 'click')
  .pipe(
    //相隔1s在点击
    throttleTime(1000),
    // 位置
    map(event => event.clientX),
    scan((count, clientX) => count + clientX, 0))
  .subscribe(count => {
    console.log(`位置${count}`);
  });

const observable = new Observable(subscribe => {
  try {
    subscribe.next(1);
    subscribe.next(2);
    subscribe.next(3);
    setTimeout(() => {
      subscribe.next(4);
      subscribe.complete();
    }, 1000);
  } catch (err) {
    subscribe.error(err)
  }
});

console.log('just before subscribe');

observable.subscribe({
  next(x) { console.log('数值' + x); },
  error(err) { console.error('错误' + err); },
  complete() { console.log('完成'); }
});

console.log('just after subscribe');

const subject = new Subject();


subject.subscribe({
  next: (v) => {
    console.log('observeA', v);
  }
})

subject.subscribe({
  next: (v) => {
    console.log('observeB', v);
  }
})

subject.next(1);
subject.next(2);

map(x => x * x)(of(1, 2, 3)).subscribe(v => console.log('map x*x', v));

first()(of(1, 2, 3)).subscribe(v => console.log('first val', v));
import { Component, OnInit, OnDestroy } from "@angular/core";
import { interval, Observable, Subscription } from "rxjs";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstAuthSubscription: Subscription;
  constructor() {}
  ngOnDestroy(): void {
    this.firstAuthSubscription.unsubscribe();
  }

  ngOnInit() {
    // this.firstAuthSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const customIntervalObserval = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) observer.complete();
        if (count > 3) {
          observer.error(new Error("Count is greater than 3"));
        }
        count++;
      }, 1000);
    });

    this.firstAuthSubscription = customIntervalObserval.subscribe(
      (data: number) => console.log(data),
      (error) => console.log(error),
      () => console.log("completed")
    );
  }
}

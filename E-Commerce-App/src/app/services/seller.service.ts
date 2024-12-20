import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn= new BehaviorSubject<boolean>(false);
  isloginError=new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router:Router){}

  userSignUp(data:sellerAuth){
    return this.http.post('http://localhost:3000/seller',data,{observe: 'response'}).subscribe((result)=>{
      if(result){
        localStorage.setItem("seller", JSON.stringify(result.body));
        this.isSellerLoggedIn.next(true);
        this.router.navigate(['seller-home']);
      }
    });
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
        this.router.navigate(['seller-home']);
    }
  }

  userLogin(data:loginAuth)
  {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe: 'response'}).subscribe((result:any)=>{
      if(result && result.body && result.body.length==1){
        localStorage.setItem("seller", JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }else{
        this.isloginError.emit(true);
      }
    })
  }
}


export interface sellerAuth{
  name:string,
  password:string,
  email:string
}

export interface loginAuth{
  email:string,
  password:string
}
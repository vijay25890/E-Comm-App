import { Component,OnInit } from '@angular/core';
import { loginAuth, sellerAuth, SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  isShowLoginForm:boolean=false;
  errorMessage:string='';
  constructor(private sellerService:SellerService){}

  ngOnInit(){
    this.sellerService.reloadSeller();
  }


  public SignUp(data:sellerAuth){
    this.sellerService.userSignUp(data);
  }

  public Login(data:loginAuth){
    this.sellerService.userLogin(data);
    this.sellerService.isloginError.subscribe((error)=>{
      if(error){
        this.errorMessage = 'Username or Password is incorrect';
      }
    })
  }

  public openLoginForm(){
    this.isShowLoginForm = true;
  }

  public openSignUpForm(){
    this.isShowLoginForm = false;
  }
}

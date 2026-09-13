import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  protected crds:any = {}
  login() {
    this.accountService.login(this.crds).subscribe({
      next: (res) => {
        console.log(res),
          this.crds = {}
      },
      error: (err) => alert(err.error),
      complete: () => console.log('completed')
    });
  }

  logout()
  {
    this.accountService.logout();
  }
}

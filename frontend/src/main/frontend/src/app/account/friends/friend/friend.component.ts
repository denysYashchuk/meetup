import {Component, Input} from "@angular/core";
import {FriendService} from "../friend.service";
import {Profile} from "../../profile";
import {FriendsListComponent} from "../friends.list.component";

@Component({
  selector: 'friend',
  templateUrl: './friend.component.html',
  styleUrls: [ './friend.component.css' ]
})

export class FriendComponent {
  @Input() confirmed: boolean;
  @Input() user: Profile;
  state:string="friends"
  constructor(private friendService: FriendService,
              private friendsList: FriendsListComponent){
  }

  deleteFriend(id: number){
    this.friendService.deleteFriend(id).subscribe((response)=>this.friendsList.getInfo());
  }
  confirmFriend(id: number){
    this.friendService.confirmFriend(id).subscribe((response)=>this.friendsList.getInfo());
  }
}

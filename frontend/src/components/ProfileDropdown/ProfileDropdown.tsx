import classes from './ProfileDropdown.module.scss'
import { Handshake, LogOut, Map } from 'lucide-react'
import ProfileDropDownItems from '../ProfileDropdownItems/ProfileDropdownItems'


function ProfileDropdown (props: {username: string}) {
  return (
    <div className={classes.dropDownMenu}>
      <p className={classes.username}>{props.username}</p>
      
      <ProfileDropDownItems href='/' text='Unlocked Levels'>
        <Map />
      </ProfileDropDownItems>
      <ProfileDropDownItems href='/' text='Friends'>
        <Handshake />
      </ProfileDropDownItems>
      <ProfileDropDownItems href='/' text='Logout'>
        <LogOut/>
      </ProfileDropDownItems>
    </div>
  )
}

export default ProfileDropdown

import classes from './ProfileDropdown.module.scss'
import { Handshake, LogOut, Map, Trophy } from 'lucide-react'
import ProfileDropDownItems from '../ProfileDropdownItems/ProfileDropdownItems'


function ProfileDropdown (props: {username: string}) {
  return (
    <div className={classes.dropDownMenu}>
      <h3 className={classes.username}>{props.username}</h3>
      
      <ProfileDropDownItems href='/' text='Unlocked Levels'>
        <Map color='hsl(52, 100%, 50%)'/>
      </ProfileDropDownItems>
      <ProfileDropDownItems href='/' text='Friends'>
        <Handshake color='hsl(52, 100%, 50%)'/>
      </ProfileDropDownItems>
      <ProfileDropDownItems href='/' text='Achievements'>
        <Trophy color='hsl(52, 100%, 50%)'/>
      </ProfileDropDownItems>
      <ProfileDropDownItems href='/' text='Logout'>
        <LogOut color='hsl(52, 100%, 50%)'/>
      </ProfileDropDownItems>
    </div>
  )
}

export default ProfileDropdown

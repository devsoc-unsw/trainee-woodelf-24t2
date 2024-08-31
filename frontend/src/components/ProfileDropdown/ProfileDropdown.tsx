import classes from './ProfileDropdown.module.scss'
import { Award, Handshake, LogOut, Map } from 'lucide-react'
import ProfileDropDownItems from '../ProfileDropdownItems/ProfileDropdownItems'


function ProfileDropdown (props: {username: string}) {
  return (
    <div className={classes.dropDownMenu}>
      <h3 className={classes.username}>{props.username}</h3>
      
      <ProfileDropDownItems href='/' text='Levels'>
        <Map color='hsl(52, 60%, 50%)' strokeWidth={3}/>
      </ProfileDropDownItems>
      <ProfileDropDownItems href='/' text='Friends'>
        <Handshake color='hsl(52, 60%, 50%)' strokeWidth={3}/>
      </ProfileDropDownItems>
      <ProfileDropDownItems href='/' text='Achievements'>
        <Award color='hsl(52, 60%, 50%)' strokeWidth={3}/>
      </ProfileDropDownItems>
      <ProfileDropDownItems href='/' text='Logout'>
        <LogOut color='hsl(52, 60%, 50%)' strokeWidth={3}/>
      </ProfileDropDownItems>
    </div>
  )
}

export default ProfileDropdown

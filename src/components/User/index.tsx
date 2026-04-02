import {
  Wrap,
  WrapItem,
  Avatar,
  Text,
} from '@chakra-ui/react'
import * as styles from './styles.css'

function User() {
  return (
   <div className={styles.container}>
    <Wrap>
      <WrapItem>
         <Avatar bg='GrayText'/>
      </WrapItem>
   </Wrap>
   <Text>
      User Test
   </Text>
   </div>
  )
}

export default User

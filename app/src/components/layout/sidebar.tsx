import { Avatar, Box, Button, Nav, Sidebar, Stack, Text } from 'grommet'
import { Analytics, Configure, Help, Logout, Projects, Split, StatusInfoSmall } from 'grommet-icons'
import React from 'react'

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'

const SidebarHeader = () => (
  <Box align="center" gap="small" direction="row" margin={{ bottom: 'large' }}>
    <Stack alignSelf="start" anchor="top-right">
      <Avatar src={src} />
      <Box pad="xsmall" background="orange" round responsive={false} />
    </Stack>
    <Text>Shimrit Yacobi</Text>
  </Box>
)

export interface SizebarButtonProps {
  icon: JSX.Element
  label: string
}

const SidebarButton: React.FC<SizebarButtonProps> = ({ icon, label, ...rest }) => (
  <Box pad="small">
    <Button gap="medium" alignSelf="start" plain icon={icon} label={label} {...rest} />
  </Box>
)

const SidebarFooter = () => (
  <Nav>
    <SidebarButton icon={<Help />} label="Help" />
    <SidebarButton icon={<Logout />} label="Logout" />
  </Nav>
)

const MainNavigation = () => (
  <Nav gap="large" responsive={false}>
    <SidebarButton icon={<StatusInfoSmall />} label="Focus" />
    <SidebarButton icon={<Projects />} label="Services" />
    <SidebarButton icon={<Split />} label="Flows" />
    <SidebarButton icon={<Analytics />} label="Analytics" />
    <SidebarButton icon={<Configure />} label="Configure" />
  </Nav>
)

export const AppSidebar: React.FC = () => {
  return (
    <Box direction="row" height={{ min: '100%' }}>
      <Sidebar
        responsive={false}
        background="neutral-2"
        header={<SidebarHeader />}
        footer={<SidebarFooter />}
        pad={{ left: 'medium', right: 'large', vertical: 'medium' }}>
        <MainNavigation />
      </Sidebar>
    </Box>
  )
}

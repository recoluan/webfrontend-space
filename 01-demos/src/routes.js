import React from 'react'
import { Route } from 'react-router-dom'

import RefDeom from './demos/ref'
import ContextDemo from './demos/context'
import ConcurrentModeDemo from './demos/concurrent-mode'
import SuspenseDemo from './demos/suspense'
import HooksDemo from './demos/hooks'
import ForwardRefDemo from './demos/forward-ref'
import ChildrenDemo from './demos/children'
import MemoDemo from './demos/memo'
import PortalDemo from './demos/portal'

export default (
  <>
    <Route path="/ref" component={RefDeom} />
    <Route path="/forward-ref" component={ForwardRefDemo} />
    <Route path="/context" component={ContextDemo} />
    <Route path="/concurrent" component={ConcurrentModeDemo} />
    <Route path="/suspense" component={SuspenseDemo} />
    <Route path="/hooks" component={HooksDemo} />
    <Route path="/children" component={ChildrenDemo} />
    <Route path="/memo" render={() => <MemoDemo />} />
    <Route path="/portal" render={() => <PortalDemo />} />
  </>
)

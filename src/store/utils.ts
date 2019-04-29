import { CmdType, loop, Loop } from "redux-loop"
import { Action } from "redux"

export type Ext<TState = RootState> = (delta: Partial<TState>) => TState

export type ExtWCommand<A extends Action = any, TState = RootState> = (
    delta: Partial<TState>,
    cmd: CmdType<A>
) => Loop<TState, A>

export const extend = <TState>(state: TState): Ext<TState> => delta =>
    (({ ...(state as any), ...(delta as any) } as any) as TState)

export const extendWCommand = <A extends Action, TState>(state: TState) => (delta: Partial<TState>, cmd: CmdType<A>) =>
    loop({ ...(state as any), ...(delta as any) }, cmd) as Loop<TState, any>

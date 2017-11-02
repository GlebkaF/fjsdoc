// @flow

// doc types
export type FunctionDoc = {|
  name: string,
  description: string,
|}

export type ClassDoc = {|
  name: string,
  description: string,
  methods: FunctionDoc[],
|}

// babylon classes
// TODO: extract original babylon types from babylon package
export type File = any

export type CommentBlock = any

export type ClassDeclaration = any

export type ClassMethod = any

export type Node = {
  type: string,
  loc: {
    start: {
      line: number,
    },
    end: {
      line: number,
    },
  },
}

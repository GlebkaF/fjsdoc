// @flow

// doc types
export type TypeDef = {|
  name: string,
  type: string,
  isNullable: boolean,
|}

export type FlowTypes = {|
  params: TypeDef[],
  returns: ?TypeDef,
|}

export type JSdoc = {|
  raw: string,
  description?: string,
  params?: TypeDef[],
  returns?: TypeDef,
|}

export type FunctionDoc = {|
  name: string,
  jsdoc?: JSdoc,
  flow?: FlowTypes,
|}

export type ClassDoc = {|
  name: string,
  methods: FunctionDoc[],
  jsdoc?: JSdoc,
|}

// babylon classes
// TODO: extract original babylon types from babylon package
export type File = any

export type CommentBlock = any

export type ClassDeclaration = any

export type ClassMethod = any

export type TypeAnnotation = {
  type: string,
  name: string,
}

export type ParamIdentifier = {
  name: string,
  typeAnnotation?: TypeAnnotation,
}

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

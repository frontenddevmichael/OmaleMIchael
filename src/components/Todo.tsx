type TodoProps = {
  label: string
  block?: boolean
}

/** Marks data Michael has not supplied yet. Visible on purpose — nothing is invented. */
export function Todo({ label, block }: TodoProps) {
  return (
    <span className={`todo${block ? ' todo-block' : ''}`} title={`TODO: ${label}`}>
      <span className="todo-key">todo</span>
      {label}
    </span>
  )
}

import Error from './Error'
import NameInput from './NameInput'
import ScriptInput from './ScriptInput'
import SubmitButton from './SubmitButton'
import useSubmit from './useSubmit'

export default function Form() {

  const { movieName, setMovieName, script, setScript, error, loading, handleSubmit } = useSubmit()


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <NameInput movieName={movieName} setMovieName={setMovieName} />
      <ScriptInput script={script} setScript={setScript} />
      <Error error={error} />
      <SubmitButton loading={loading} />
    </form>
  )
}

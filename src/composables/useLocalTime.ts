import { onBeforeUnmount, onMounted, ref } from 'vue'

/** The current time in Ashgabat, as "14:32". Empty during pre-rendering. */
export function useLocalTime(timeZone = 'Asia/Ashgabat') {
  const time = ref('')
  const format = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone })
  let timer: ReturnType<typeof setInterval> | undefined

  onMounted(() => {
    const tick = () => (time.value = format.format(new Date()))
    tick()
    timer = setInterval(tick, 15_000)
  })
  onBeforeUnmount(() => clearInterval(timer))

  return time
}

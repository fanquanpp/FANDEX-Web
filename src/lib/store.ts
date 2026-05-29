import { reactive, watch } from 'vue';
import { getAllProgress, type ProgressMap } from './progress';

export const globalState = reactive({
  progress: {} as ProgressMap,
  activeModule: '',
  searchQuery: '',
  isMobile: false,
  initialized: false,
});

let channel: BroadcastChannel | null = null;

if (typeof BroadcastChannel !== 'undefined') {
  channel = new BroadcastChannel('fandex-sync');
  channel.onmessage = (e: MessageEvent) => {
    if (e.data?.type === 'progress-update') {
      Object.assign(globalState.progress, e.data.progress);
      window.dispatchEvent(new CustomEvent('progress-sync'));
    }
  };
}

watch(
  () => globalState.progress,
  (newProgress) => {
    channel?.postMessage({
      type: 'progress-update',
      progress: newProgress,
    });
  },
  { deep: true }
);

export async function initGlobalState() {
  globalState.progress = getAllProgress();

  const checkMobile = () => {
    globalState.isMobile = window.innerWidth <= 768;
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);

  globalState.initialized = true;
}

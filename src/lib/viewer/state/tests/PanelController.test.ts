import { get } from 'svelte/store';
import { describe, expect, it, vi } from 'vitest';
import { createViewerDerived } from '../viewerDerived';
import { createViewerState, type ViewerStateStores } from '../viewerState';
import { createPanelController } from '../controllers/PanelController';

const leftPanelState = (state: ViewerStateStores) => ({
  contents: get(state.showContents),
  annotations: get(state.showAnnotations),
  tools: get(state.showTools),
  settings: get(state.showSettings),
  search: get(state.showSearch),
  metadata: get(state.showMetadata),
  layers: get(state.showLayers),
});

describe('PanelController', () => {
  it('does not reopen the last left panel when permissions change after all left panels are closed', () => {
    const state = createViewerState({ config: {} });
    const derived = createViewerDerived(state);
    const controller = createPanelController({
      state,
      derived,
      emitEvent: vi.fn(),
      emitStateChange: vi.fn(),
    });
    const unsubscribers = controller.setupPanelEffects();

    try {
      expect(get(state.showMetadata)).toBe(true);

      controller.setPanelOpen('metadata', false);
      expect(leftPanelState(state)).toEqual({
        contents: false,
        annotations: false,
        tools: false,
        settings: false,
        search: false,
        metadata: false,
        layers: false,
      });

      state.config.set({ showMetadata: false });
      state.config.set({});

      expect(leftPanelState(state)).toEqual({
        contents: false,
        annotations: false,
        tools: false,
        settings: false,
        search: false,
        metadata: false,
        layers: false,
      });
    } finally {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    }
  });
});

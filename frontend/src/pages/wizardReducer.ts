import type { Repository, CommitRef } from '../types';

export type WizardStep = 0 | 1 | 2 | 3;

export interface WizardState {
  step: WizardStep;
  repo: Repository | null;
  branch: string;
  commits: CommitRef[];
  title: string;
  body: string;
  summary: string;
  generating: boolean;
  saving: boolean;
}

export const initialWizardState: WizardState = {
  step: 0,
  repo: null,
  branch: '',
  commits: [],
  title: '',
  body: '',
  summary: '',
  generating: false,
  saving: false,
};

export type WizardAction =
  | { type: 'SELECT_REPO'; repo: Repository }
  | { type: 'SELECT_BRANCH'; branch: string }
  | { type: 'SET_COMMITS'; commits: CommitRef[] }
  | { type: 'SET_DRAFT'; title: string; body: string; summary: string }
  | { type: 'SET_TITLE'; title: string }
  | { type: 'SET_BODY'; body: string }
  | { type: 'SET_GENERATING'; value: boolean }
  | { type: 'SET_SAVING'; value: boolean }
  | { type: 'GO_BACK' };

export function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SELECT_REPO':
      return { ...state, repo: action.repo, branch: '', commits: [], step: 1 };
    case 'SELECT_BRANCH':
      return { ...state, branch: action.branch, commits: [], step: 2 };
    case 'SET_COMMITS':
      return { ...state, commits: action.commits };
    case 'SET_DRAFT':
      return { ...state, title: action.title, body: action.body, summary: action.summary, step: 3 };
    case 'SET_TITLE':
      return { ...state, title: action.title };
    case 'SET_BODY':
      return { ...state, body: action.body };
    case 'SET_GENERATING':
      return { ...state, generating: action.value };
    case 'SET_SAVING':
      return { ...state, saving: action.value };
    case 'GO_BACK':
      return { ...state, step: Math.max(0, state.step - 1) as WizardStep };
    default:
      return state;
  }
}

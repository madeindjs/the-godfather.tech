/**
 * Exemple:
 *
 * ~~~js
 * const response = {
 *   login: 'madeindjs',
 *   id: 11815139,
 *   node_id: 'MDQ6VXNlcjExODE1MTM5',
 *   avatar_url: 'https://avatars.githubusercontent.com/u/11815139?v=4',
 *   gravatar_id: '',
 *   url: 'https://api.github.com/users/madeindjs',
 *   html_url: 'https://github.com/madeindjs',
 *   followers_url: 'https://api.github.com/users/madeindjs/followers',
 *   following_url:
 *     'https://api.github.com/users/madeindjs/following{/other_user}',
 *   gists_url: 'https://api.github.com/users/madeindjs/gists{/gist_id}',
 *   starred_url: 'https://api.github.com/users/madeindjs/starred{/owner}{/repo}',
 *   subscriptions_url: 'https://api.github.com/users/madeindjs/subscriptions',
 *   organizations_url: 'https://api.github.com/users/madeindjs/orgs',
 *   repos_url: 'https://api.github.com/users/madeindjs/repos',
 *   events_url: 'https://api.github.com/users/madeindjs/events{/privacy}',
 *   received_events_url: 'https://api.github.com/users/madeindjs/received_events',
 *   type: 'User',
 *   site_admin: false,
 *   score: 1,
 * };
 * ~~~
 */
export interface GithubUserResponse {
  id: number;
  login: string;
  avatar_url: string;
}

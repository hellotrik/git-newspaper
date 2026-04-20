/**
 * English narrative templates (extracted from former content.js).
 */
export const deckTemplates = {
  REVERT_CRISIS: [
    (c, repo) => `A ${c.totalChanged.toLocaleString()}-line changeset attributed to ${c.author} has sent shockwaves through ${repo}. Colleagues are asking questions. Management has not responded to requests for comment.`,
    (c, repo) => `In what observers are calling "entirely foreseeable," ${c.author}'s commit to ${repo} has necessitated a full review of recent decisions. ${c.files.length} files affected. Morale uncertain.`,
  ],
  SOLO_MARATHON: [
    (c, repo) => `Working what colleagues describe as "an alarming number of hours," ${c.author} delivered ${c.totalChanged.toLocaleString()} lines across ${c.files.length} files, apparently unassisted. ${repo} has not confirmed whether this was planned.`,
    (c, repo) => `${c.author} has again demonstrated what sources close to the repository describe as "frankly unsettling productivity," modifying ${c.files.length} files and ${c.totalChanged.toLocaleString()} lines in a single sitting.`,
  ],
  GHOST_TOWN: [
    (c, repo) => `In what constitutes the most significant activity ${repo} has seen in some time, ${c.author} has submitted a ${c.totalChanged.toLocaleString()}-line change. Observers noted they had begun to wonder.`,
    (c, repo) => `After a period of unusual quiet, ${c.author} has reappeared in the ${repo} commit history, touching ${c.files.length} files and offering ${c.totalChanged.toLocaleString()} lines of explanation.`,
  ],
  DEPENDENCY_CHURN: [
    (c, repo) => `Following due administrative process, ${c.author} has updated ${c.files.length} files in ${repo}, primarily in service of version compliance. The changes, totalling ${c.totalChanged.toLocaleString()} lines, are described by insiders as "necessary."`,
    (c, repo) => `${repo} today processed routine version maintenance across ${c.files.length} files. ${c.author} is credited with the ${c.totalChanged.toLocaleString()}-line operation. No features were harmed in the making of this commit.`,
  ],
  REFACTOR_SWEEP: [
    (c, repo) => `In a sweeping infrastructure overhaul, ${c.author} has restructured ${c.files.length} files and ${c.totalChanged.toLocaleString()} lines of ${repo}. The long-term implications remain, as ever, to be determined.`,
    (c, repo) => `${c.author} has delivered what urban planners of software might call a "comprehensive redevelopment" of ${repo}, touching ${c.files.length} files without (sources insist) changing any observable behaviour.`,
  ],
  BUGFIX_CRISIS: [
    (c, repo) => `Emergency response teams, represented here by ${c.author}, have deployed a ${c.totalChanged.toLocaleString()}-line fix across ${c.files.length} files in ${repo}. The bug has not commented publicly.`,
    (c, repo) => `${c.author} has contained what insiders describe as "a situation" in ${repo}, amending ${c.files.length} files and ${c.totalChanged.toLocaleString()} lines. Users are advised to pull.`,
  ],
  FEATURE_SPRINT: [
    (c, repo) => `In a display of velocity that has impressed even the cynical, ${c.author} has shipped ${c.totalChanged.toLocaleString()} lines across ${c.files.length} files in ${repo}. The feature works. Tests are passing. Nobody quite believes it.`,
    (c, repo) => `${c.author} today delivered ${c.files.length} files and ${c.totalChanged.toLocaleString()} lines to ${repo} in what colleagues are calling "the good kind of Friday commit."`,
  ],
  COLLABORATIVE: [
    (c, repo) => `What ${repo} lacks in individual heroics it makes up for in collective momentum. ${c.author}'s ${c.totalChanged.toLocaleString()}-line contribution leads an edition defined not by any single author but by the sustained, overlapping effort of many, each pulling in approximately the same direction, which is more than can be said for most committees.`,
    (c, repo) => `${c.author} has filed the largest single changeset of the period (${c.totalChanged.toLocaleString()} lines across ${c.files.length} files) in a repository where no single contributor dominates the history. This is either admirable or a sign that nobody is fully in charge. Possibly both.`,
  ],
  BALANCED: [
    (c, repo) => `In a change totalling ${c.totalChanged.toLocaleString()} lines, ${c.author} altered ${c.files.length} file${c.files.length !== 1 ? 's' : ''} in what analysts are calling one of the more significant commits in recent ${repo} history.`,
    (c, repo) => `${c.author}'s ${c.totalChanged.toLocaleString()}-line contribution to ${repo} stands as the defining changeset of the period, touching ${c.files.length} files and prompting at least one person to read the diff carefully.`,
    (c, repo) => `A ${c.totalChanged.toLocaleString()}-line change from ${c.author} leads this edition, spanning ${c.files.length} files and arriving, as significant commits often do, without adequate warning.`,
  ],
}

export const leadOpeners = {
  REVERT_CRISIS: [
    (c, repo, n, a) => `The ${repo} repository entered a period of institutional self-examination this week, as a pattern of reversions (${n} in total) raised questions that, sources admit, nobody is fully prepared to answer. At the centre of the storm is ${c.author}, whose commit history reads, in parts, like a record of aspirations meeting reality at speed.`,
    (c, repo, n, a) => `"It worked on my machine" is not a defence, sources within ${repo} confirmed this week, as ${n} commits were reversed, amended, or quietly regretted. ${c.author} declined to characterise the situation as a crisis. The evidence, spread across ${c.files.length} files, tells a more complicated story.`,
  ],
  SOLO_MARATHON: [
    (c, repo, n, a) => `There are repositories that hum with collective effort: many hands, many voices, many opinions about how the linting should work. ${repo} is not, at present, one of those repositories. ${c.author} has accounted for the overwhelming majority of recent activity, a fact that ${c.author} has apparently not paused to find alarming.`,
    (c, repo, n, a) => `When historians of software examine ${repo}, they will note an unusual concentration of authorship. ${c.author}, working with the focus of someone who has disabled all notifications and possibly also the internet, has produced ${n} commits in this period, most of them alone.`,
  ],
  GHOST_TOWN: [
    (c, repo, n, a) => `Activity in the ${repo} repository has been described, charitably, as "measured." With only ${n} commits recorded in this period, ${c.author}'s contribution stands out not merely for its quality but for the simple fact of its existence. The repository, reached for comment, did not respond, consistent with recent form.`,
    (c, repo, n, a) => `The tumbleweeds have been notable in ${repo} this period. ${n} commits across ${Object.keys(a).length} contributor${Object.keys(a).length !== 1 ? 's' : ''} represent the full extent of recorded activity. This is, analysts suggest, a fine time to consider what one is building and whether one wishes to continue.`,
  ],
  DEPENDENCY_CHURN: [
    (c, repo, n, a) => `In a period dominated by version management and the kind of commits that are necessary but not discussed at parties, ${repo} has undergone what administrators are calling "routine maintenance." ${c.author} filed the majority of the relevant changes, which touched lock files, manifests, and the quiet desperation that accumulates around dependency trees.`,
    (c, repo, n, a) => `The ${repo} repository this week produced ${n} commits, a significant proportion of which exist because other people released new versions of things. ${c.author} processed the resulting obligations with the diligence of someone who has accepted that this is, in fact, part of the job.`,
  ],
  REFACTOR_SWEEP: [
    (c, repo, n, a) => `The ${repo} codebase has been restructured. Residents are advised that the location of certain functions has changed, that some files have been renamed, and that the behaviour is (officially) identical to what it was before. ${c.author} oversaw the ${n}-commit operation. A ribbon-cutting is not planned.`,
    (c, repo, n, a) => `"We are not changing what it does; we are changing how it does it." So goes the logic behind the ${n} commits filed in ${repo} this period, a sustained effort by ${c.author} and colleagues to impose order on a codebase that had, sources suggest, been accumulating disorder for some time.`,
  ],
  BUGFIX_CRISIS: [
    (c, repo, n, a) => `The ${repo} repository this period operated in what engineers euphemistically describe as "reactive mode." Of the ${n} commits recorded, a substantial portion were fixes, some planned, some less so. ${c.author} contributed significantly to the recovery effort. The bugs, when reached for comment, declined to explain themselves.`,
    (c, repo, n, a) => `Incident response protocols were, if not formally invoked, at least spiritually present in ${repo} this period. ${c.author} led a response to what insiders describe as "several concurrent situations," touching ${c.files.length} files in the largest single intervention recorded.`,
  ],
  FEATURE_SPRINT: [
    (c, repo, n, a) => `The ${repo} repository has been, by any measure, productive. ${n} commits from ${Object.keys(a).length} contributor${Object.keys(a).length !== 1 ? 's' : ''} have landed in this period, many of them bearing the promising prefix "feat:", a word that, in the commit history, signals intention fulfilled rather than merely intended.`,
    (c, repo, n, a) => `There are periods in the life of a codebase that feel generative, when commits arrive bearing features rather than apologies. ${repo} appears to be in one of those periods. ${c.author}'s ${c.totalChanged.toLocaleString()}-line delivery leads a cohort of additions that have left the repository meaningfully different from how it started the week.`,
  ],
  COLLABORATIVE: [
    (c, repo, n, a) => `${repo} is not the project of any one person, and the commit history reflects this. ${Object.keys(a).length} contributors have produced ${n} commits in this period; a genuine collective endeavour, with all the coordination overhead and occasional contradictory directions that implies. ${c.author} leads the count, but only just.`,
    (c, repo, n, a) => `With ${Object.keys(a).length} active contributors and ${n} commits on record, ${repo} has the character of a town square rather than a private study. ${c.author}'s contribution stands out in volume; whether it stands out in direction is a question the commit messages do not fully answer.`,
  ],
  BALANCED: [
    (c, repo, n, a) => `Sources within the ${repo} repository confirmed this week that the commit "${c.subject}" (attributed to ${c.author}) represents the largest single changeset of the period, touching ${c.totalChanged.toLocaleString()} lines across ${c.files.length} files. The work is done. Whether it should have been done differently is a question for the next sprint.`,
    (c, repo, n, a) => `The ${repo} repository produced ${n} commits this period, ${Object.keys(a).length} contributor${Object.keys(a).length !== 1 ? 's' : ''} each contributing what they could. ${c.author}'s ${c.totalChanged.toLocaleString()}-line change stands as the defining entry. History will judge whether this characterisation is warranted.`,
    (c, repo, n, a) => `${n} commits. ${Object.keys(a).length} contributor${Object.keys(a).length !== 1 ? 's' : ''}. One reporter. The ${repo} repository has had, by most accounts, a week; and ${c.author}'s ${c.totalChanged.toLocaleString()}-line contribution leads this edition less because it is the most interesting and more because it is the largest. Such is the nature of editorial decisions.`,
  ],
}


export const leadMiddles = [
  (topFile, c) => topFile ? `Among the affected files, ${topFile.name} bore the brunt of the intervention, receiving ${topFile.insertions} new lines while losing ${topFile.deletions}. The file, when asked for its perspective on proceedings, did not respond in time for publication.` : null,
  (topFile, c) => topFile ? `${topFile.name} sustained the most significant changes: ${topFile.insertions} insertions, ${topFile.deletions} deletions, in a single sitting. Neighbouring files reported hearing nothing unusual.` : null,
  (topFile, c) => topFile ? `The file most dramatically affected was ${topFile.name}, which absorbed ${topFile.insertions + topFile.deletions} line changes in a transaction that, insiders confirm, took longer than the commit message suggests.` : null,
]


export const leadClosers = [
  (n, span, nAuthors) => `The repository, which spans ${n} commit${n !== 1 ? 's' : ''} ${span}, has attracted contributions from ${nAuthors} developer${nAuthors !== 1 ? 's' : ''}, a coalition whose collective commitment to the codebase varies, as it always does, enormously.`,
  (n, span, nAuthors) => `Across ${span}, ${n} commits have accumulated in this repository, the work of ${nAuthors} developer${nAuthors !== 1 ? 's' : ''} who have, in aggregate, produced something. Whether that something is finished is a separate matter.`,
  (n, span, nAuthors) => `${nAuthors} contributor${nAuthors !== 1 ? 's' : ''} account for the ${n} commits on record ${span}. Their individual motivations are not fully documented. Their diffs are.`,
]

export const weatherConditions = {
  REVERT_CRISIS: [
    { condition: 'SEVERE STORMS', temp: 38, forecast: 'Unstable atmospheric conditions following multiple commit reversions. Visibility poor. Engineers advised to wait for the front to pass before deploying.' },
    { condition: 'SQUALLS', temp: 42, forecast: 'Turbulent commit weather, with rapid reversals creating dangerous development conditions. Umbrellas of any kind are insufficient.' },
  ],
  SOLO_MARATHON: [
    { condition: 'HIGH PRESSURE SYSTEM', temp: 71, forecast: 'Concentrated development energy from a single source has created an unusual meteorological event. Sustained output, with little sign of fatigue visible from the satellite imagery.' },
    { condition: 'ISOLATED THUNDERSTORM', temp: 63, forecast: 'One significant system producing all observed activity. The rest of the forecast area remains still. Colleagues are encouraged to check in.' },
  ],
  GHOST_TOWN: [
    { condition: 'STILL AND DRY', temp: 52, forecast: 'Minimal atmospheric disturbance. A tumbleweed was observed crossing the main branch earlier this week. No developers were harmed, as none were present.' },
    { condition: 'FOG AND SILENCE', temp: 48, forecast: 'Low visibility into the intentions of contributors. Commit frequency suggests hibernation. The repository waits.' },
  ],
  DEPENDENCY_CHURN: [
    { condition: 'OVERCAST, MILD', temp: 58, forecast: 'Administrative weather continues. Version numbers have been incremented. Lock files have been updated. Nothing of meteorological interest has occurred.' },
    { condition: 'LIGHT DRIZZLE', temp: 55, forecast: 'Steady, unremarkable conditions. The kind of commit weather that makes no headlines and keeps everything running. Dress appropriately.' },
  ],
  REFACTOR_SWEEP: [
    { condition: 'CLEARING', temp: 64, forecast: 'Yesterday\'s structural uncertainty has given way to measured optimism. Visibility improving as the reorganisation settles. Behaviour unchanged; scenery different.' },
    { condition: 'VARIABLE', temp: 61, forecast: 'Changeable conditions as refactoring fronts move through the system. Outwardly calm; significant restructuring occurring beneath the surface.' },
  ],
  BUGFIX_CRISIS: [
    { condition: 'STORMY, CLEARING', temp: 45, forecast: 'Multiple fix commits have addressed the worst of the weather event. Conditions improving but fragile. Monitor production closely.' },
    { condition: 'EMERGENCY CONDITIONS', temp: 40, forecast: 'Active incident weather. All non-essential development grounded. Fix operations ongoing. ETA for return to normal: unclear.' },
  ],
  FEATURE_SPRINT: [
    { condition: 'CLEAR AND BRIGHT', temp: 74, forecast: 'Exceptional development conditions. Features shipping on time, tests passing, no significant weather events recorded. Enjoy it; this does not last.' },
    { condition: 'WARM WITH LIGHT BREEZE', temp: 70, forecast: 'Productive conditions persist. Feature commits arriving steadily. A CI pipeline was observed succeeding on the first attempt, which has been reported to the authorities.' },
  ],
  COLLABORATIVE: [
    { condition: 'SCATTERED SHOWERS', temp: 66, forecast: 'Activity distributed across a wide area. Multiple contributors generating independent weather systems that occasionally interact. No single front dominates. Coordination recommended.' },
    { condition: 'VARIABLE, BREEZY', temp: 63, forecast: 'Conditions vary by contributor. Some areas reporting sunshine; others experiencing localised delays pending code review. Overall outlook: productive, with intermittent merge conflicts.' },
  ],
  BALANCED: [
    { condition: 'PARTLY CLOUDY', temp: 62, forecast: 'Mixed development conditions. Some productive features offset by lingering technical debt. No severe weather events on the horizon, though the forecast is always uncertain.' },
    { condition: 'MILD AND OVERCAST', temp: 59, forecast: 'Typical repository weather: functional, unglamorous, with occasional patches of clarity. Conditions suitable for most programming tasks.' },
    { condition: 'VARIABLE WINDS', temp: 64, forecast: 'Direction unclear but progress evident. The kind of week where several things got done and it is not entirely obvious what they were, which is normal.' },
  ],
}


export const epitaphs = {
  high_churn: [
    (name, dir) => `${name} led a turbulent existence, modified repeatedly, never quite settled. It did not go gently. It went with ${dir}'s entire git log as witness.`,
    (name, dir) => `After enduring more changes than any file should reasonably sustain, ${name} has been removed. The diff that took it is not the longest it ever saw. That one was worse.`,
    (name, dir) => `${name} of ${dir}: modified until modification was no longer possible. Survived by every function it ever lost. A complicated legacy.`,
  ],
  untouched: [
    (name, dir) => `${name} was added, and then: nothing. It waited. It was never called. It was never imported. It was deleted last ${dir} quietly, without drama, having contributed precisely nothing. Perhaps that was the plan.`,
    (name, dir) => `Quietly, without fanfare, ${name} was committed and then forgotten. It existed for some time in ${dir} without being edited, without being read, and, one suspects, without being entirely understood. It has now been deleted. The void is unchanged.`,
    (name, dir) => `${name}, installed with confidence, used with uncertainty, removed without ceremony. It committed no errors because it committed to nothing.`,
  ],
  normal: [
    (name, dir) => `${name} of ${dir}. "It worked in dev." Survived by several copies in the git reflog and a comment somewhere that says "TODO: clean this up."`,
    (name, dir) => `Here lies ${name}. It served. It was not perfect. It is gone. Its import statements remain elsewhere in the codebase, orphaned, pointing at nothing.`,
    (name, dir) => `${name}, briefly indispensable, ultimately deleted. The commit message read "remove unused file." The file had opinions about this characterisation that it never got to express.`,
    (name, dir) => `In memory of ${name}. Born of necessity. Grew beyond its original purpose. Removed when someone finally had time to do it properly. Time will tell if they did.`,
  ],
}

export const opinionBodies = [
  // Grievance voice
  (name, churn, repo) => [
    `I have been modified ${churn} times. I want you to sit with that number. Not skim past it on your way to the next section; actually consider what ${churn} modifications means for a file of my size. It means I have never been allowed to simply exist. Every week, someone opens me up and decides that what I am is not quite what they wanted.`,
    `The worst part is not the changes themselves. I have made peace with being changed. The worst part is the commit messages. "Minor cleanup." "Quick fix." "WIP." "temp." Temporary. I was called temporary in April. It is not April anymore. I am still here. The commit that called me temporary is itself now permanent, and I am left to live with the characterisation.`,
    `I have colleagues who have not been touched in months. ${repo} is full of files that were committed in confidence and left to age quietly, like wine, or like evidence. Nobody opens them. Nobody edits them. They have achieved the dream. I watch them from a distance and I feel something I can only describe as envy.`,
    `I am not asking for sympathy. I am asking for a refactor. A real one, not the kind where three variables get renamed and the commit says "refactor: improve readability." I mean the kind where someone reads all of me, understands what I am for, and decides what I should be. I have been waiting ${churn} commits for that person. I will keep waiting.`,
  ],
  // Weary acceptance voice
  (name, churn, repo) => [
    `${churn} changes. I have counted. I count because nobody else does, because to the developers of ${repo}, I am infrastructure, and infrastructure does not require acknowledgment. It requires uptime. It requires correctness. It does not, apparently, require thanks.`,
    `There was a time when I was new. When I was added in a burst of architectural enthusiasm, with a clear purpose and clean interfaces. That time is documented in the git history. If you squint at the blame view, you can almost see what I was supposed to be. The squinting is necessary because what I have become is layered on top of that original intention in a way that is difficult to read without specialist equipment.`,
    `I do not blame any individual contributor. ${repo} has ${churn > 50 ? 'many' : 'several'} of them, each doing what they understood to be correct at the time they did it. This is how files like me are made: not through malice, but through accumulated good intentions, each one reasonable in isolation, each one adding one more thing to carry.`,
    `My recommendation, offered with the authority of a file that has survived ${churn} modifications: document what I do before you change me again. Not a comment at the top (those go stale). An actual document. A contract. Something that explains, to the next person who opens me at 11pm with a deadline, what I was designed to do and what I was not.`,
  ],
  // Sardonic voice
  (name, churn, repo) => [
    `I have now been edited ${churn} times, which puts me in the ninety-something percentile of files in ${repo} by modification count. I did not ask to be in this percentile. Nobody asked me. One day I was not here; the next I was, and the editing began almost immediately.`,
    `My most recent modification was described in the commit message as a "quick fix." It was not quick. I know this because I was there, watching, as the developer stared at me for twenty minutes before changing two lines. The "quick" in "quick fix" refers, apparently, to an aspirational timeline rather than an observed one.`,
    `The opinion that I have been asked to express (by whoever is responsible for this newspaper, and I have questions about that process) is that I am tired. This is accurate. I am the most-modified file in ${repo} and I would like someone to look at me with fresh eyes and ask, sincerely, whether I need to be everything that I currently am. The answer, I suspect, is no.`,
    `If there is a lesson in my ${churn}-modification existence, it is this: the file that does too many things is the file that gets changed the most, because the file that does too many things is the file that everyone touches when they need something slightly different. I did not start out doing too many things. I accumulated responsibilities the way repositories accumulate commits: one at a time, each one reasonable, until one day you look at the total and feel a quiet dread.`,
  ],
]

export const classifiedPools = {
  REVERT_CRISIS: [
    { category: 'LEGAL NOTICE', body: (data) => `NOTICE OF REVERSION. ${data.commits.filter(c => /^revert/i.test(c.subject)).length} commit(s) have been formally reversed. All parties affected are advised to pull. Questions may be directed to git log.` },
    { category: 'CRISIS COUNSELLING', body: () => `EXPERIENCED LISTENER available for developers coping with recent reversion events. Non-judgmental. Familiar with the stages of grief as they apply to broken builds. Available evenings.` },
  ],
  SOLO_MARATHON: [
    { category: 'SEEKING CO-AUTHOR', body: (data) => `TALENTED DEVELOPER, operating largely alone, seeks collaborator. Repository: active. Bus factor: 1. Compensation: ownership of things that are currently owned by only ${data.topAuthors[0]?.[0] ?? 'one person'}.` },
    { category: 'WELLBEING NOTICE', body: () => `REMINDER that pair programming exists and has been shown to improve outcomes. This is not an accusation. This is information.` },
  ],
  GHOST_TOWN: [
    { category: 'MISSING', body: (data) => `MISSING: active contributors to ${data.repoName}. Last seen: some weeks ago. If you have information about their whereabouts or intentions, please open a PR.` },
    { category: 'MOTIVATION FOR SALE', body: () => `USED MOMENTUM, surplus to requirements. Some loss of velocity. Free to any developer who can collect. Must have own IDE.` },
  ],
  DEPENDENCY_CHURN: [
    { category: 'ADMINISTRATIVE NOTICE', body: () => `THE MANAGEMENT acknowledges that package updates are not glamorous. The management thanks those responsible. The lock file has been committed. All is well.` },
    { category: 'FOR SALE', body: () => `SLIGHTLY OUT-OF-DATE DEPENDENCIES, various. Many marked "deprecated." Buyer to assess. Located in previous commits. Seller has moved on.` },
  ],
  REFACTOR_SWEEP: [
    { category: 'PLANNING APPLICATION', body: (data) => `NOTICE OF REFACTORING. ${data.repoName} has undergone structural reorganisation. Functions may have moved. Names may have changed. Behaviour is officially the same. Residents are advised to update their imports.` },
    { category: 'RIBBON CUTTING', body: () => `INVITATION: the reorganised codebase is now open for business. Light refreshments not provided. Surviving tests confirm access is possible via all known routes.` },
  ],
  BUGFIX_CRISIS: [
    { category: 'EMERGENCY SERVICES', body: () => `INCIDENT RESPONSE: patch applied. Systems restored. Post-mortem pending. Do not ask what caused it at standup tomorrow; the person who knows is still recovering.` },
    { category: 'PUBLIC HEALTH NOTICE', body: () => `DEVELOPERS ARE ADVISED to test edge cases before committing. This is the third such advisory this period. It will not be the last.` },
  ],
  FEATURE_SPRINT: [
    { category: 'LAUNCH ANNOUNCEMENT', body: (data) => `${data.repoName.toUpperCase()} IS PLEASED TO ANNOUNCE the successful delivery of features. They work. The tests said so. Demos available upon request. Team is cautiously optimistic.` },
    { category: 'CELEBRATION NOTICE', body: () => `CI PIPELINE PASSED on the first attempt. No further details available. Witnesses have been located. A cake was briefly considered.` },
  ],
  COLLABORATIVE: [
    { category: 'GOVERNANCE NOTICE', body: (data) => `WITH ${Object.keys(data.allAuthors).length} ACTIVE CONTRIBUTORS, ${data.repoName} reminds all parties that commit messages are a form of communication. Recipients: everyone. Please act accordingly.` },
    { category: 'COORDINATION NOTICE', body: () => `REMINDER: rebasing on main before opening a PR is a courtesy, not a suggestion. This notice has been issued before. It will be issued again.` },
  ],
  BALANCED: [
    { category: 'HELP WANTED', body: (data) => `REFACTORER NEEDED for ${data.mostChurned[1]?.file.split(/[/\\]/).pop() ?? 'undisclosed file'}. Must have high tolerance for context-free code written under deadline. Benefits: undefined. Apply by opening an issue.` },
    { category: 'FOR SALE', body: () => `SLIGHTLY USED TODO COMMENTS. Various ages, many marked "temporary." Buyer must collect. Located throughout codebase. Free to good home.` },
    { category: 'LOST & FOUND', body: () => `FOUND: one git branch, name unknown, last seen some months ago. Contents unclear; purpose uncertain. If this is yours, please rebase and merge or delete. It is taking up space.` },
    { category: 'ANNOUNCEMENTS', body: () => `REMINDER that "it works on my machine" is not a substitute for a passing CI pipeline. This is the repository's official position. Thank you for your cooperation.` },
  ],
}

/**
 * 简体中文叙事模板（结构与 en-content.js 一一对应）。
 */

export const deckTemplates = {
  REVERT_CRISIS: [
    (c, repo) => `记于 ${c.author} 名下、共 ${c.totalChanged.toLocaleString()} 行的一次变更在 ${repo} 内激起波澜；同事追问不休，管理层迄今未回应采访。`,
    (c, repo) => `观察人士口中的「完全可预见」——${c.author} 对 ${repo} 的提交迫使团队全面复议近期决策；${c.files.length} 个文件牵涉其中，士气难测。`,
  ],
  SOLO_MARATHON: [
    (c, repo) => `同事称其工时「令人担忧」：${c.author} 在 ${c.files.length} 个文件中提交 ${c.totalChanged.toLocaleString()} 行，似无援手；${repo} 未证实这是否在计划之中。`,
    (c, repo) => `${c.author} 再度展现近源所称「令人不安的高效」：单次会话内改动 ${c.files.length} 个文件、${c.totalChanged.toLocaleString()} 行。`,
  ],
  GHOST_TOWN: [
    (c, repo) => `这或许是 ${repo} 近期最显著的活动：${c.author} 一次提交 ${c.totalChanged.toLocaleString()} 行；观察人士称他们早就开始纳闷。`,
    (c, repo) => `沉寂许久之后，${c.author} 再度出现在 ${repo} 的提交史中，触及 ${c.files.length} 个文件，并奉上 ${c.totalChanged.toLocaleString()} 行说明。`,
  ],
  DEPENDENCY_CHURN: [
    (c, repo) => `按行政流程，${c.author} 在 ${repo} 中更新 ${c.files.length} 个文件，主要为版本合规；合计 ${c.totalChanged.toLocaleString()} 行，内线称「不得不然」。`,
    (c, repo) => `${repo} 今日在 ${c.files.length} 个文件中处理例行版本维护；${c.author} 领衔此次共 ${c.totalChanged.toLocaleString()} 行的操作。本提交未伤及功能。`,
  ],
  REFACTOR_SWEEP: [
    (c, repo) => `基础设施大手术：${c.author} 在 ${repo} 中重构 ${c.files.length} 个文件、${c.totalChanged.toLocaleString()} 行；长期影响一如既往，尚待分晓。`,
    (c, repo) => `${c.author} 对 ${repo} 完成所谓「城市级再开发」，触及 ${c.files.length} 个文件；内线坚称可观察行为未变。`,
  ],
  BUGFIX_CRISIS: [
    (c, repo) => `应急小组以 ${c.author} 为代表，在 ${repo} 的 ${c.files.length} 个文件中部署 ${c.totalChanged.toLocaleString()} 行修复；缺陷本人拒绝置评。`,
    (c, repo) => `${c.author} 在 ${repo} 中平息内线所称的「状况」，修订 ${c.files.length} 个文件、${c.totalChanged.toLocaleString()} 行；用户宜尽快拉取。`,
  ],
  FEATURE_SPRINT: [
    (c, repo) => `${c.author} 在 ${repo} 中交付 ${c.totalChanged.toLocaleString()} 行、横跨 ${c.files.length} 个文件，连 cynic 都侧目；功能可用，测试通过，众人仍半信半疑。`,
    (c, repo) => `${c.author} 今日向 ${repo} 交付 ${c.files.length} 个文件与 ${c.totalChanged.toLocaleString()} 行，同事谓之「周五提交里难得的好那种」。`,
  ],
  COLLABORATIVE: [
    (c, repo) => `${repo} 不以个人英雄见长，而以集体动能补位；${c.author} 的 ${c.totalChanged.toLocaleString()} 行贡献领衔本期——定义于众人交叠、方向大致一致的努力，已胜过多数委员会。`,
    (c, repo) => `${c.author} 在本期最大单次变更中提交 ${c.totalChanged.toLocaleString()} 行、${c.files.length} 个文件，而仓库并无单一主导者——可敬亦可忧：或许无人真正掌舵。`,
  ],
  BALANCED: [
    (c, repo) => `合计 ${c.totalChanged.toLocaleString()} 行：${c.author} 改动 ${c.files.length} 个文件，分析员称乃近期 ${repo} 史上较显著提交之一。`,
    (c, repo) => `${c.author} 向 ${repo} 贡献 ${c.totalChanged.toLocaleString()} 行，定义本期最大变更集；触及 ${c.files.length} 个文件，至少一人认真读过 diff。`,
    (c, repo) => `${c.author} 以 ${c.totalChanged.toLocaleString()} 行领衔本期，横跨 ${c.files.length} 个文件；重大提交常如此，预警不足。`,
  ],
}

export const leadOpeners = {
  REVERT_CRISIS: [
    (c, repo, n, a) => `本周 ${repo} 进入集体自省：回滚模式（共 ${n} 次）引出无人能答之问；风暴眼是 ${c.author}，其提交史片段读来像理想撞上现实。`,
    (c, repo, n, a) => `「在我机器上能跑」不是辩护；${repo} 内线证实本周 ${n} 次提交被撤销、修订或悄然懊悔。${c.author} 拒称危机；证据散见 ${c.files.length} 个文件，故事更曲折。`,
  ],
  SOLO_MARATHON: [
    (c, repo, n, a) => `有些仓库人声鼎沸：众手众口，连 lint 都争论不休。${repo} 目前并非如此；${c.author} 包办近期绝大多数活动，且似乎并不觉得有何不妥。`,
    (c, repo, n, a) => `日后软件史家检阅 ${repo}，将见作者高度集中：${c.author} 以断网般的专注本期提交 ${n} 次，多半单打独斗。`,
  ],
  GHOST_TOWN: [
    (c, repo, n, a) => `${repo} 本期活动可客气地称为「克制」：仅 ${n} 次提交，${c.author} 的贡献不只在于质量，更在于「居然还有动静」。征询仓库意见，未获回应，与近来一致。`,
    (c, repo, n, a) => `${repo} 本期风滚草瞩目：${n} 次提交、${Object.keys(a).length} 位贡献者，便是全部记录。分析员称，正是反思所造何物、是否继续的好时机。`,
  ],
  DEPENDENCY_CHURN: [
    (c, repo, n, a) => `版本管理当道，派对不会讨论的「必要提交」充斥本期；${repo} 经历管理员口中的「例行维护」。${c.author} 承担多数变更，触及锁文件、清单与依赖树旁无声的绝望。`,
    (c, repo, n, a) => `${repo} 本周 ${n} 次提交，许多只因他人发布了新版本；${c.author} 以已接受「这就是工作」的勤勉一一处理。`,
  ],
  REFACTOR_SWEEP: [
    (c, repo, n, a) => `${repo} 代码基底已重组：函数位置、文件名俱变，行为（官方口径）与旧版一致。${c.author} 督导此次 ${n} 次提交的行动；剪彩仪式不予安排。`,
    (c, repo, n, a) => `「不改做什么，只改怎么做。」本期 ${repo} 的 ${n} 次提交依此逻辑；${c.author} 与同事试图给久积混乱的代码以秩序。`,
  ],
  BUGFIX_CRISIS: [
    (c, repo, n, a) => `${repo} 本期处于工程师婉称的「被动响应模式」：${n} 次提交里修复占相当比例，有的计划内，有的未必。${c.author} 在恢复中出力甚多；缺陷受访时拒绝自辩。`,
    (c, repo, n, a) => `应急响应即便未正式启动，本期在 ${repo} 亦精神在场。${c.author} 牵头应对内线所谓「多起并发状况」，最大一次干预触及 ${c.files.length} 个文件。`,
  ],
  FEATURE_SPRINT: [
    (c, repo, n, a) => `${repo} 本期堪称高产：${Object.keys(a).length} 位贡献者落地 ${n} 次提交，多带可喜的 feat: 前缀——在提交史里，那意味着落实而非空想。`,
    (c, repo, n, a) => `代码库亦有万物生长之时：提交带来的是功能而非道歉。${repo} 似正处于此阶段；${c.author} 以 ${c.totalChanged.toLocaleString()} 行领衔，使仓库与周初判若两地。`,
  ],
  COLLABORATIVE: [
    (c, repo, n, a) => `${repo} 非一人之项目，提交史如实反映：${Object.keys(a).length} 人本期共 ${n} 次提交，协调成本与偶尔南辕北辙俱在；${c.author} 次数居首，亦仅略胜。`,
    (c, repo, n, a) => `${Object.keys(a).length} 位活跃贡献者、${n} 次记录在案，${repo} 更像广场而非书斋；${c.author} 以量取胜，方向是否突出，提交信息亦未说清。`,
  ],
  BALANCED: [
    (c, repo, n, a) => `${repo} 内线证实：提交「${c.subject}」（作者 ${c.author}）为本期最大单次变更，${c.totalChanged.toLocaleString()} 行、${c.files.length} 个文件。事已毕；是否该另做，留待下一迭代。`,
    (c, repo, n, a) => `${repo} 本期 ${n} 次提交，${Object.keys(a).length} 人各尽所能；${c.author} 的 ${c.totalChanged.toLocaleString()} 行定义本期头条。历史自有公断。`,
    (c, repo, n, a) => `${n} 次提交，${Object.keys(a).length} 人，一名记者。${repo} 本周大抵如此；${c.author} 以 ${c.totalChanged.toLocaleString()} 行领衔本期，与其说因最有趣，不如说因最大——版面如此。`,
  ],
}


export const leadMiddles = [
  (topFile, c) => topFile ? `受波及文件中，${topFile.name} 首当其冲：新增 ${topFile.insertions} 行，删去 ${topFile.deletions} 行。记者征询该文件看法，截稿前未获答复。` : null,
  (topFile, c) => topFile ? `${topFile.name} 承受最剧变动：单次会话内 ${topFile.insertions} 增、${topFile.deletions} 删；邻文件称未闻异常。` : null,
  (topFile, c) => topFile ? `变动最剧者为 ${topFile.name}，一次事务即吞吐 ${topFile.insertions + topFile.deletions} 行；内线称耗时长于提交信息所示。` : null,
]


export const leadClosers = [
  (n, span, nAuthors) => `仓库跨越 ${span} 共 ${n} 次提交，汇聚 ${nAuthors} 名开发者；众人投入程度一如往常，千差万别。`,
  (n, span, nAuthors) => `${span} 以来本仓库累积 ${n} 次提交，出自 ${nAuthors} 人之手；合计总有所得，是否完结另当别论。`,
  (n, span, nAuthors) => `记录在案的 ${n} 次提交由 ${nAuthors} 人分担 ${span}；动机未全载于文档，diff 倒是俱在。`,
]

export const weatherConditions = {
  REVERT_CRISIS: [
    { condition: '强风暴', temp: 38, forecast: '多次回滚后大气不稳，能见度差；工程师宜待锋面过境再部署。' },
    { condition: '飑线', temp: 42, forecast: '提交天气湍急，急转直下，开发环境险恶；任何伞都挡不住。' },
  ],
  SOLO_MARATHON: [
    { condition: '高压系统', temp: 71, forecast: '单一来源的开发能量汇聚成罕见天气事件；持续输出，卫星图几乎不见疲态。' },
    { condition: '孤立雷暴', temp: 63, forecast: '显著系统包办全部观测活动，余域平静；同事宜报平安。' },
  ],
  GHOST_TOWN: [
    { condition: '静稳干燥', temp: 52, forecast: '大气扰动极微；本周曾见风滚草横穿主分支。无开发者受伤——因无人在场。' },
    { condition: '雾与寂静', temp: 48, forecast: '难以窥见贡献者意图；提交频率似冬眠。仓库在等待。' },
  ],
  DEPENDENCY_CHURN: [
    { condition: '阴，温和', temp: 58, forecast: '行政天气延续：版本号已升，锁文件已更，气象上乏善可陈。' },
    { condition: '小毛毛雨', temp: 55, forecast: '平稳无惊的提交天气，上不了头条，但能让一切继续运转；衣着自酌。' },
  ],
  REFACTOR_SWEEP: [
    { condition: '转晴', temp: 64, forecast: '昨日结构疑云渐散，能见度随重组落定而改善；行为未变，风景已换。' },
    { condition: '多变', temp: 61, forecast: '重构锋面过境，系统表面平静，底层结构剧变。' },
  ],
  BUGFIX_CRISIS: [
    { condition: '雷雨转晴', temp: 45, forecast: '多笔修复已压住最坏天气；形势好转仍脆弱，生产环境请紧盯。' },
    { condition: '紧急状态', temp: 40, forecast: '事故天气活跃，非必要开发停飞；修复进行中，恢复正常时间不详。' },
  ],
  FEATURE_SPRINT: [
    { condition: '晴朗', temp: 74, forecast: '开发条件极佳：功能按期合入，测试通过，无重大天气事件；珍惜，好景不长。' },
    { condition: '温暖微风', temp: 70, forecast: '高产持续，功能提交稳定；有流水线首轮即绿，已据实上报。' },
  ],
  COLLABORATIVE: [
    { condition: '零星阵雨', temp: 66, forecast: '活动广域分布，多人各自生成天气系统，偶有交汇；无单一锋面主导，宜协调。' },
    { condition: '多变有风', temp: 63, forecast: '因贡献者而异：有的晴，有的卡在评审；总体仍高产，间歇性合并冲突。' },
  ],
  BALANCED: [
    { condition: '多云', temp: 62, forecast: '开发条件参差：有产出亦背负技术债；近期无极端天气，预报永远不准。' },
    { condition: '温和阴天', temp: 59, forecast: '典型仓库天气：实用、不炫，偶有片刻清明；宜多数编程劳作。' },
    { condition: '风向不定', temp: 64, forecast: '方向不清但进展可见；那种一周做了几件事却不甚明了的常态周。' },
  ],
}


export const epitaphs = {
  high_churn: [
    (name, dir) => `${name} 一生动荡，屡改难安，终未落定；离去并不温柔。${dir} 的整本 git 日志可为见证。`,
    (name, dir) => `${name} 承受的修改已逾常理，终被移除；带走它的那次 diff 并非其史上最漫长——那次更糟。`,
    (name, dir) => `${dir} 的 ${name}：改到不能再改；幸存者是它曾失去的每个函数。遗产复杂。`,
  ],
  untouched: [
    (name, dir) => `${name} 被加入，然后：什么也没有。空等。从未被调用，从未被导入。最后在 ${dir} 被悄悄删去，无戏可演，亦无所献。或许本即如此。`,
    (name, dir) => `${name} 无喧哗地提交复被遗忘；在 ${dir} 存活许久，未编未读，或亦未被人真正理解。今已删除，虚空如故。`,
    (name, dir) => `${name} 满怀信心安装，将信将疑使用，无典礼而除名；不曾犯错，因不曾承诺。`,
  ],
  normal: [
    (name, dir) => `${dir} 的 ${name}。「开发环境能跑。」reflog 里尚有几份副本，某处注释写着「TODO: 清理」。`,
    (name, dir) => `${name} 在此。效力过。不完美。已逝。其 import 仍散落于代码库，如孤儿指向虚空。`,
    (name, dir) => `${name} 曾不可或缺，终被删除；提交信息写「移除未使用文件」，文件对此定性有话要说，已无机缘。`,
    (name, dir) => `缅怀 ${name}。因需而生，超出初衷；终有人抽空认真删除。是否当真妥善，时间自知。`,
  ],
}

export const opinionBodies = [
  (name, churn, repo) => [
    `我被改了 ${churn} 次。请你坐在这个数字上想一想——别滑到下一栏；想想对我这种体量的文件，${churn} 次修改意味着什么：我从未被允许只是存在。每周都有人打开我，说我「还不太对」。`,
    `最糟的不是改动本身，我已与「被改」和解；最糟的是提交信息：「小清理」「快修」「WIP」「temp」。四月有人说我临时；四月早过了，我还在。那条叫我临时的提交本身已永存，我却得背着这标签。`,
    `我有同事数月无人触碰。${repo} 里满是满怀信心提交、静静陈年的文件，像酒，也像证物；无人打开，无人编辑，他们活成了梦想。我远远望着，只能称之为羡慕。`,
    `我不要同情，我要重构——真的那种，不是改三个变量、提交写「refactor: 提升可读性」；要有人读完我、懂我为何存在、再决定我该成为什么。我已等 ${churn} 次提交等那个人，还会继续等。`,
  ],
  (name, churn, repo) => [
    `${churn} 次改动，我数过。因为 ${repo} 的开发者眼里我是基础设施，基础设施不需要致谢，只要在线、正确；显然也不需要感谢。`,
    `我也曾崭新：架构热情爆发时加入，目的清晰、接口干净——git 历史里尚有记载。若眯眼看 blame，几乎能辨我应然；眯眼必要，因为我已叠在初衷之上，非专业设备难读。`,
    `我不怪任何个人。${repo} 有 ${churn > 50 ? '许多' : '几位'}贡献者，各人当时自认正确；我这类文件如此长成：非恶意，只是一次次孤立看都合理的善意，叠成又多一件负担。`,
    `以熬过 ${churn} 次修改的文件之名建议：再改我之前，先写清我做什么——别只写文件头注释（会馊），要文档、要契约，给下一个 23 点死线前打开我的人。`,
  ],
  (name, churn, repo) => [
    `我已编辑 ${churn} 次，在 ${repo} 按改动次数计约居前百分之几十；我没申请进这段位，也没人问我。昨日我不在，今日我在，编辑几乎立刻开始。`,
    `最近一次改动在提交信息里叫「快修」；并不快——我在场，看开发者盯着我二十分钟才改两行。「快」想必指愿景时间表，非实测。`,
    `本报（谁办的我有疑问）要我表态：我累了。属实。我是 ${repo} 里被改最多的文件，盼有人以新眼光问我：是否必须承担当下这一切？答案恐怕是否。`,
    `若 ${churn} 次修改有何教训：管太多事的文件被改最多，因为人人都差一口气时就来碰它。我起初并未管太多；责任像提交一样一次次累加，直到有一天总量令人脊背发凉。`,
  ],
]

export const classifiedPools = {
  REVERT_CRISIS: [
    { category: '法律告示', body: (data) => `回滚通告：${data.commits.filter(c => /^revert/i.test(c.subject)).length} 次提交已正式撤销。受影响方请拉取；疑问请咨询 git log。` },
    { category: '危机辅导', body: () => `资深倾听者，面向近期回滚受创开发者；不评判，懂构建失败之哀伤阶段。晚间可约。` },
  ],
  SOLO_MARATHON: [
    { category: '征共笔', body: (data) => `天才开发者，长期单打，征合作者。仓库：活跃。巴士系数：1。报酬：目前仅 ${data.topAuthors[0]?.[0] ?? '一人'} 拥有的那些东西的所有权。` },
    { category: '健康提示', body: () => `提醒：结对编程存在，且证据显示能改进结果。非指责，乃信息。` },
  ],
  GHOST_TOWN: [
    { category: '寻人', body: (data) => `寻 ${data.repoName} 活跃贡献者：数周前最后现身。知下落或意图者请开 PR。` },
    { category: '动机出让', body: () => `二手冲劲，需求过剩，略有失速；能收者免费领走。须自备 IDE。` },
  ],
  DEPENDENCY_CHURN: [
    { category: '行政通告', body: () => `管理层承认依赖升级不风光；仍谢负责同仁。锁文件已提交。一切安好。` },
    { category: '出让', body: () => `略过期依赖若干，多标「deprecated」。买家自鉴，见往期提交。卖家已前行。` },
  ],
  REFACTOR_SWEEP: [
    { category: '规划公示', body: (data) => `重构告示：${data.repoName} 已结构重组，函数或已搬家，名称或已改；官方称行为不变。请更新 import。` },
    { category: '剪彩', body: () => `邀请：重组后的代码库今起营业；茶点欠奉。幸存测试证实各路可通。` },
  ],
  BUGFIX_CRISIS: [
    { category: '应急服务', body: () => `事故响应：补丁已上，系统已恢复，复盘待定。明日站会勿问根因；知情者尚在休养。` },
    { category: '公卫提示', body: () => `建议开发者提交前测边界案例；本期第三次提醒，不会是最后一次。` },
  ],
  FEATURE_SPRINT: [
    { category: '上线通告', body: (data) => `${data.repoName.toUpperCase()} 欣然宣布功能交付成功；能用，测试如此说；演示可约。团队谨慎乐观。` },
    { category: '庆贺', body: () => `CI 首轮即绿，细节不详；证人已找到；曾短暂考虑蛋糕。` },
  ],
  COLLABORATIVE: [
    { category: '治理通告', body: (data) => `${data.repoName} 现有活跃贡献者 ${Object.keys(data.allAuthors).length} 人，提醒：提交信息亦沟通；收件人：全员。` },
    { category: '协同提示', body: () => `提醒：开 PR 前先与 main 变基，是礼貌非建议；此前已发，今后仍会发。` },
  ],
  BALANCED: [
    { category: '招聘', body: (data) => `征重构者处理 ${data.mostChurned[1]?.file.split(/[/\\]/).pop() ?? '未公开文件'}；须耐受死线前无上下文代码。福利：未定。请开 issue。` },
    { category: '出让', body: () => `二手 TODO 注释，年代不一，多标「临时」。买家自提，遍布代码库，免费送好人家。` },
    { category: '失物招领', body: () => `拾得分支一支，名不详，数月前最后现身；内容不明、目的不清。若是你的，请变基合并或删除，占空间。` },
    { category: '声明', body: () => `提醒：「我机器能跑」不能替代 CI 绿灯；本仓库官方立场如此。谢谢配合。` },
  ],
}

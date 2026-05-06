// Project data — single source of truth for both index and detail pages.
// Sections render as { h: "Heading", b: "<paragraph(s) HTML>" }.
window.PROJECTS = [
  {
    slug: "spherical-graduation",
    title: "Analysis, Implementation & Control of a Parallel Spherical Manipulator",
    course: "ENS 491-492 · Graduation Project",
    date: "2026",
    badge: "Graduation Project",
    badgeClass: "badge--robotics",
    categories: ["robotics", "controls"],
    featured: true,
    pdf: "pdfs/FinalReport_30561_30975 (1).docx.pdf",
    images: 6,
    collaborators: "Ömür Kaan Sarı",
    supervisor: "Volkan Patoğlu",
    summary: "A 3-DOF holonomic spherical robot with a vision-based drift compensation system. AprilTag markers + a custom ray–sphere intersection algorithm recover the sphere's absolute orientation and feed it into the Simulink control loop over UDP.",
    tags: ["Spherical robot", "AprilTag / ArUco", "Ray–sphere intersection", "Raspberry Pi 5", "Simulink", "UDP", "Quaternions"],
    sections: [
      { h: "Executive Summary", b: "<p>This graduation project develops and improves a <strong>spherical parallel robot</strong> — an educational platform for teaching 3D rotations and quaternion mathematics. The robot is <em>holonomic</em>: it can rotate in any direction without mechanical limits.</p><p>The mechanical structure was inherited from previous groups, but the system suffered from a critical failure: <strong>position drift</strong>. The previous design estimated orientation purely from motor encoders, assuming no slip between the wheels and the sphere. In practice, sudden acceleration, variable friction and mechanical flex cause micro-slips, and because orientation is computed by integrating these movements, even tiny errors accumulate.</p><p>To fix this, we built a <strong>vision-based drift compensation system</strong>. Optical-flow sensors (computer-mouse style) failed on the curved surface, so we developed a camera-based system using a Raspberry Pi and a wide-angle camera. AprilTag/ArUco markers were applied across the sphere, and a <em>ray–sphere intersection</em> algorithm recovers the sphere's absolute 3D orientation geometrically. The visual estimate is streamed into the Simulink control loop over UDP and compared against the encoder estimate to detect and correct drift in real time.</p>" },
      { h: "Problem Statement", b: "<p>The parallel spherical manipulator is novel as an educational haptic device, with very little comparable literature available. The robot is a 3-DOF system: motor drivers, fans and circuit components at the bottom, two steering and two driving motors connected to the wheels that contact the sphere, the sphere itself stabilised by bearings, and an optical camera placed above to monitor orientation.</p><p>The drift problem comes from two combined effects: <strong>loss of contact</strong> between the wheels and the sphere at certain orientations, and momentary <strong>over-friction</strong> at others. Together they cause the wheels to fail tracking and the sphere to perform unintended rotations. The added sensor system needs to monitor this drift and inject the error into the closed-loop motor controller to improve precision.</p>" },
      { h: "What We Built On", b: "<p>As the third group on this project, kinematic analysis and a baseline Simulink controller (PID per motor with hand-tuned gains, plus filtering) were already in place. Our objectives were to:</p><ul><li>Repair, label and re-organise the years-old hardware setup so the rest of the work would be reliable.</li><li>Design and implement a sensor system that observes the real rotation of the sphere.</li><li>Extend the existing controller to use that signal for drift compensation in real time.</li></ul>" },
      { h: "Methodology — Vision-Based Sensing", b: "<p>Our chosen approach was a vision-based sensor using an optical camera. A unique surface pattern made of <strong>ArUco markers with unique IDs</strong> was applied to the sphere. A fixed camera placed above tracks the markers, and the geometry of where each marker lies on the sphere lets us recover the absolute 3D orientation independent of wheel motion — so the estimate is not affected by slip or friction variations.</p><p>The orientation measured by the camera is then compared with the orientation predicted from the motor encoders. The difference is interpreted as drift and fed back into the control loop as an error signal. By continuously correcting this error during operation, the system reduces the gap between desired and actual sphere orientation throughout the motion.</p>" },
      { h: "Hardware & Constraints", b: "<p>The control computer for the camera was a <strong>Raspberry Pi 5 (8 GB)</strong>, which capped the camera at ~17 fps despite the sensor being capable of 100+ fps. The ArUco markers were vulnerable to specular reflection — they appeared as bright white blobs under strong light — so each marker was over-coated with matte varnish, and an additional shading layer was added on top of the system.</p><p>Throughout the project the years-old hardware threw repeated curveballs: snapped encoder cables on the SML axis, a wheel that was loose on its motor shaft (causing huge tracking errors and high-speed runaway), and a snapped power cable. These were diagnosed and repaired one by one — a reminder of how hardware-oriented multi-year projects accumulate maintenance debt.</p>" },
      { h: "Kinematics in Brief", b: "<p>The spherical robot is modelled as five bodies: the sphere <code>K</code>, two links <code>LR</code>/<code>LL</code> and two wheels <code>WR</code>/<code>WL</code>, with auxiliary frames <code>BR</code>/<code>BL</code> on the contact normals. Steering angles are <code>ψr, ψl</code> and wheel angles are <code>φr, φl</code>. The sphere's orientation in the inertial frame is represented with <strong>unit quaternions (Euler parameters)</strong> to avoid representation singularities — wheel/sphere contact points provide the non-holonomic motion constraints used in the controller derivation.</p>" }
    ]
  },

  {
    slug: "drone-swarm",
    title: "Swarm Intelligence Simulation for Autonomous Drones",
    course: "ME 395 · Internship at Altınay Savunma",
    date: "Summer 2025",
    badge: "Defense-Industry Internship",
    badgeClass: "badge--ctrl",
    categories: ["robotics", "controls"],
    featured: true,
    pdf: "pdfs/ME395_FinalReport_GoktugArda_Gok_08082025.doc .pdf",
    images: 6,
    collaborators: null,
    supervisor: "Adnan Kefal",
    summary: "Hardware-independent swarm and obstacle-avoidance simulation built during a defense-industry internship. MATLAB App Designer UI, Artificial Potential Field motion with a custom Danger-Zone escape rule, behaviour state machine — then ported to ROS 2 and visualised in RViz.",
    tags: ["MATLAB App Designer", "ROS 2", "RViz", "Artificial Potential Field", "State machine", "Obstacle avoidance"],
    sections: [
      { h: "Where & When", b: "<p><strong>Altınay Defense Technologies</strong> (Altınay Savunma Teknolojileri A.Ş.) is a Turkish defense company in Teknopark Istanbul, working on motion control, unmanned vehicles, weapon systems and production technologies for the defense and aerospace sectors. Internship dates: <strong>16 June 2025 – 11 August 2025</strong>, placed in the Mechanical Department but bridging Control, AI and Software teams.</p>" },
      { h: "What I Built", b: "<p>The project was a <strong>hardware-independent simulation</strong> for autonomous drone swarms — used to validate algorithms in a safe, low-cost environment before any real hardware. I built a <strong>MATLAB App Designer UI</strong> that lets the operator configure the swarm: number of drones, formations, obstacles, and attack commands. The simulation then runs the full behaviour and visualises the result.</p><p>Drone motion uses the <strong>Artificial Potential Field (APF)</strong> method — attractive potentials pull drones toward targets, repulsive potentials push them away from obstacles and from each other. APF alone is well known to fail in tight spaces, so I added a custom <strong>“Danger Zone” escape rule</strong>: when a drone gets too close to an obstacle, it switches into an escape policy that overrides the standard potential gradient until it's clear.</p><p>Overall behaviour is sequenced by a simple <strong>state machine</strong> with states <em>Idle / Flying / Moving / Attacking</em>, so commands from the UI translate cleanly into per-drone behaviour transitions.</p>" },
      { h: "Porting to ROS 2", b: "<p>After validating the algorithms in MATLAB, I moved the project into <strong>ROS 2</strong> and used <strong>RViz</strong> for visualisation. Drones and obstacles became RViz markers, and the same APF + Danger-Zone + state-machine logic was re-implemented in the ROS 2 framework. The swarm successfully kept its formation, avoided obstacles, and executed coordinated maneuvers across the test scenarios — confirming that the algorithm survives the move from a monolithic MATLAB simulation to a distributed message-passing system.</p>" },
      { h: "Takeaways", b: "<p>The internship was a hands-on lesson in how swarm algorithms move from prototype to a robotics framework: MATLAB is excellent for fast iteration and visualisation, but the move to ROS 2 surfaces concurrency and message-timing concerns that don't exist in a single-threaded simulation. Recommended next steps: real hardware tests, and improving the obstacle-avoidance efficiency under denser obstacle fields.</p>" }
    ]
  },

  {
    slug: "imdb-sentiment",
    title: "IMDB Sentiment Classification — Naive Bayes vs. Linear SVM vs. Bi-LSTM",
    course: "CS 412 · Term Project · Group 14",
    date: "Spring 2025",
    badge: "Machine Learning",
    badgeClass: "badge--cs",
    categories: ["ml"],
    featured: true,
    pdf: "pdfs/CS412-Project-14.pdf",
    images: 6,
    collaborators: "Defne Kızılkaya, Onur Deniz Öğüncü, Uygar Hatipoğlu, Muhammed Reşid Sağlam",
    supervisor: null,
    summary: "Binary sentiment classification on 50,000 IMDB movie reviews. Compared Multinomial Naive Bayes, Linear SVM (both on TF-IDF) and a Bidirectional LSTM. Linear SVM won with macro F1 = 0.9036, ROC-AUC = 0.9637 — beating the deep model.",
    tags: ["NLP", "TF-IDF", "Multinomial NB", "Linear SVM", "Bi-LSTM", "scikit-learn", "PyTorch"],
    sections: [
      { h: "Problem", b: "<p>Binary sentiment classification on the <strong>IMDB Movie Reviews dataset</strong>: 50,000 human-labelled reviews, balanced 25k positive / 25k negative. Input is freeform user text, output is <code>positive</code> (1) or <code>negative</code> (0). The official evaluation metric for cross-model comparison was the <strong>macro-averaged F1-score</strong>.</p>" },
      { h: "Dataset Profile", b: "<p>An exploratory pass before training surfaced the dataset's shape:</p><ul><li>Average review length <strong>231 ± 171 words</strong>; quartiles 126 / 173 / 280; min 4, max 2470.</li><li>Vocabulary of <strong>101,944 unique tokens</strong>, with a hapax ratio of <strong>38.1%</strong> — many words appear only once.</li><li>Top-5 tokens are stopwords (<em>the, and, a, of, to</em>) — confirming the importance of normalisation/filtering.</li></ul><p>Stratified 80/20 train-test split, with a 10% validation slice carved off the training set during neural-net training to monitor overfitting.</p>" },
      { h: "Three Models", b: "<ul><li><strong>Multinomial Naive Bayes</strong> — fast probabilistic baseline on sparse TF-IDF features.</li><li><strong>Linear SVM</strong> — linear classifier optimised with SGD, same TF-IDF representation.</li><li><strong>Bidirectional LSTM</strong> — recurrent model on padded word-token sequences, capturing left/right context.</li></ul><p>Preprocessing: HTML stripping with regex, lowercasing, and standard text cleaning before vectorisation/tokenisation.</p>" },
      { h: "Results", b: "<p>The <strong>Linear SVM</strong> came out on top with a macro F1 of <strong>0.9036</strong> and ROC-AUC of <strong>0.9637</strong>, ahead of both Naive Bayes and the Bi-LSTM. The deep model was hampered by limited training data and the relatively long-range dependencies in long reviews — a useful empirical reminder that a tuned linear baseline on good features is hard to beat for this kind of bag-of-words-friendly task.</p>" }
    ]
  },

  {
    slug: "celeba-vgg16",
    title: "Gender Classification on CelebA — Transfer Learning with VGG-16",
    course: "CS 412 · Homework 4",
    date: "Spring 2025",
    badge: "Deep Learning",
    badgeClass: "badge--cs",
    categories: ["ml"],
    pdf: "pdfs/CS412_HW4_GoktugArdaGok.pdf",
    images: 6,
    summary: "Binary gender classifier on a 30,000-image CelebA subset. Transfer learning from ImageNet-pretrained VGG-16 with the classifier head replaced for binary output. Compared frozen vs. partially-unfrozen backbones across two learning rates.",
    tags: ["VGG-16", "Transfer learning", "PyTorch", "torchvision", "CelebA", "BCEWithLogitsLoss"],
    sections: [
      { h: "Setup", b: "<p>Used the <strong>CelebA30k</strong> subset (30,000 images) split <strong>24k / 3k / 3k</strong> for train/val/test. Labels converted to binary (Male = 1, Female = 0). Images resized to 224×224 to match the VGG-16 input, normalised with ImageNet statistics, and augmented with random horizontal flips during training.</p>" },
      { h: "Model", b: "<p>Started from <strong>VGG-16 pretrained on ImageNet</strong>. The classifier head was replaced with a single linear layer outputting one logit:</p><p><code>model.classifier[6] = nn.Linear(4096, 1)</code></p><p>Loss was <code>nn.BCEWithLogitsLoss</code> (so no Sigmoid layer in the model itself), optimiser was <code>Adam</code>. Training ran for 10 epochs per experiment.</p>" },
      { h: "Four Experiments", b: "<p>Two freezing strategies × two learning rates:</p><ul><li><strong>Exp 1</strong>: Freeze all conv layers, lr = 0.001 — fast convergence but limited by frozen features.</li><li><strong>Exp 2</strong>: Freeze all conv layers, lr = 0.0001 — more cautious updates, better validation accuracy.</li><li><strong>Exp 3</strong>: Unfreeze the last conv block, lr = 0.001 — risk of large unstable updates.</li><li><strong>Exp 4</strong>: Unfreeze the last conv block, lr = 0.0001 — best trade-off between adaptation and stability.</li></ul><p>Evaluated with test accuracy and a confusion matrix on the held-out 3k images.</p>" }
    ]
  },

  {
    slug: "me408-control",
    title: "Cascaded Control of a 2-DOF Planar Manipulator",
    course: "ME 408 · Project Part 3",
    date: "2025",
    badge: "Mechatronics System Design",
    badgeClass: "badge--ctrl",
    categories: ["controls"],
    pdf: "pdfs/projectpart_report_goktugardagok.pdf",
    images: 6,
    summary: "Full closed-loop control of a 2-DOF planar arm. Inner PI loop regulates motor current through a buck-boost model and a back-EMF-aware electrical transfer function; outer PID tracks joint angles derived from the desired end-effector trajectory via inverse kinematics.",
    tags: ["Cascaded PID", "Buck-boost converter", "Inverse kinematics", "Simulink", "MATLAB Function blocks"],
    sections: [
      { h: "Goal", b: "<p>Build a full closed-loop control system for a <strong>2-DOF planar robotic manipulator</strong> using a <em>cascaded</em> architecture: an inner loop regulates motor current, and an outer loop ensures the end-effector tracks a reference trajectory in task space. Both loops are developed and tested in Simulink with MATLAB function blocks for system dynamics and kinematics.</p>" },
      { h: "Three-Part Build", b: "<ul><li><strong>Part 1 — Inner loop (current control):</strong> a PI controller regulates motor current using a buck-boost converter model and a motor electrical model with inductance, resistance, and back-EMF.</li><li><strong>Part 2 — Outer loop (angle control):</strong> a PID per joint tracks reference joint angles produced from the desired X-Y trajectory by inverse kinematics.</li><li><strong>Part 3 — Combined system:</strong> the two are integrated into a full cascade where the outer PID generates torque, which is converted into a current reference tracked by the inner loop.</li></ul>" },
      { h: "Parameters", b: "<p>Mechanical parameters (estimated from a SolidWorks CAD model): link lengths <code>l1 = 0.3 m</code>, <code>l2 = 0.4 m</code>; masses <code>m1 = 0.408 kg</code>, <code>m2 = 0.129 kg</code>; inertias <code>I1 = 9.6e-5</code>, <code>I2 = 2.19e-3</code> kg·m². Motor: <code>R = 1.0 Ω</code>, <code>L = 0.01 H</code>, <code>Kt = Ke = 0.5</code>, gear ratio <code>r = 4</code>, friction <code>B = 0.13 N·m·s</code>.</p><p>The current loop's PI was tuned with <code>Kp = 5</code>, <code>Ki = 500</code>, <code>Vs = 12 V</code> on top of <code>L = 2.22 mH</code>, <code>R = 0.965 Ω</code>. Tested with step and ramp current references, confirming fast, stable and accurate tracking before being plugged into the outer loop.</p>" },
      { h: "Tooling", b: "<p>Implemented as a Simulink model on top of MATLAB scripts that define physical parameters and call <code>sim()</code> in a loop. Interpreted MATLAB Function blocks wrap the dynamics (<code>dynamics.m</code>), forward and inverse kinematics (<code>fwdkine.m</code>, <code>invkine.m</code>), the buck-boost voltage computation (<code>buckboost.m</code>) and the time-varying reference generator (<code>reference.m</code>) — keeping each piece independently testable.</p>" }
    ]
  },

  {
    slug: "quadrotor",
    title: "Quadrotor Dynamics — 4-DOF and 6-DOF Models",
    course: "ME 425 · Homework 3",
    date: "November 2024",
    badge: "Aerial Robotics",
    badgeClass: "badge--ctrl",
    categories: ["controls"],
    pdf: "pdfs/30975_HW#3_ME425_GoktugArdaGok.pdf",
    images: 6,
    summary: "Simulink models for a quadrotor in two control regimes. 4-DOF for hovering, disturbance rejection and indirect planar motion; 6-DOF adds direct X/Y forces to track full trajectories — takeoff, straight lines, circular loops, landing.",
    tags: ["Quadrotor", "6-DOF", "Trajectory tracking", "Simulink", "PID", "Euler angles"],
    sections: [
      { h: "What Was Modelled", b: "<p>Two control regimes for a quadrotor:</p><ul><li><strong>4-DOF</strong> — basic altitude and planar motion control. Position in X-Y is achieved indirectly by manipulating roll <code>ϕ</code> and pitch <code>θ</code>.</li><li><strong>6-DOF</strong> — extends the model with direct horizontal forces <code>Ux</code>, <code>Uy</code> for explicit X-Y trajectory tracking.</li></ul><p>Both models follow the textbook split: translational dynamics in the inertial Earth frame, rotational dynamics in the body frame, with Euler angles <code>(ϕ, θ, ψ)</code> recovered from the body angular rates <code>(p, q, r)</code>.</p>" },
      { h: "4-DOF Subsystems", b: "<p>The Simulink model has three primary subsystems:</p><ul><li><strong>Translational dynamics</strong> — driven by thrust <code>U1</code> and Euler angles, using sin/cos blocks, gain blocks for <code>1/m</code>, integrators for position. Outputs <code>X, Y, Z</code>.</li><li><strong>Rotational dynamics</strong> — driven by torques <code>U2, U3, U4</code>, with gain blocks for inertia terms <code>1/Ixx</code> etc. Outputs body rates <code>p, q, r</code>.</li><li><strong>Euler angle subsystem</strong> — converts <code>(p, q, r)</code> into <code>(ϕ, θ, ψ)</code> via the standard kinematic relations.</li></ul><p>PID controllers stabilise altitude (<code>Z</code>) and attitude (<code>ϕ, θ</code>); planar motion is then driven by tilting the vehicle via attitude references.</p>" },
      { h: "6-DOF Trajectory", b: "<p>The 6-DOF version adds <code>Ux</code> and <code>Uy</code> as direct horizontal forces and a MATLAB-function trajectory generator that sequences:</p><ul><li><strong>Takeoff</strong> (t = 0–5): <code>Z = 2t</code></li><li><strong>Straight line</strong> (t = 10–15): <code>X = 2(t−10)</code></li><li><strong>Circular loop</strong> (t = 15–25): <code>X = 10 + 5cos(ωt)</code>, <code>Y = 5sin(ωt)</code>, <code>ω = 2π/10</code></li><li><strong>Landing</strong> (t = 25–30): <code>Z = 10 − 2(t−25)</code></li></ul><p>PID controllers on each position axis and each attitude angle generate the six control efforts. The rotational dynamics and Euler-angle subsystems are reused unchanged from the 4-DOF model.</p>" }
    ]
  },

  {
    slug: "ev3-odometry",
    title: "Wheeled Robot — Odometric Estimation",
    course: "ME 425 · Lab 2",
    date: "October 2024",
    badge: "Mobile Robotics",
    badgeClass: "badge--robotics",
    categories: ["robotics"],
    pdf: "pdfs/Group#4_30975_16736_Lab#2_Post_Lab_Report.pdf",
    images: 6,
    collaborators: "Mertcan Aslanseven",
    summary: "Two-wheeled differential-drive robot built on LEGO Mindstorms EV3. Encoder readings stream into MATLAB to estimate the robot's x-y position during straight-line and circular motions. Studies the effect of sampling time and motor power on accuracy.",
    tags: ["Differential drive", "Odometry", "LEGO EV3", "MATLAB", "Encoders"],
    sections: [
      { h: "Setup", b: "<p>A two-wheeled differential-drive robot built from a LEGO Mindstorms EV3 kit, with two front active wheels and two rear passive caster wheels for support. Right motor on port C, left on port B. Real-time encoder reads stream into MATLAB over USB using the EV3 Support Package.</p><p>Geometric parameters: wheel radius <code>R = 0.03 m</code>, wheelbase <code>L = 0.14 m</code>, sampling time <code>dt = 0.1 s</code>, total run <code>5 s</code>.</p>" },
      { h: "Linear Motion", b: "<p>Both motors driven equally to produce a straight-line motion along the x-axis. Encoder readings are integrated to estimate the robot's <code>(x, y)</code> path, and the result is plotted against the desired trajectory. With <code>v_desired = 0.5 m/s</code> for 5 s, the desired final x is 2.5 m and y is 0; mean and max errors over the run are computed in MATLAB.</p>" },
      { h: "Circular Motion", b: "<p>Only the right motor is powered, so the robot rotates around the stationary left wheel. The desired circular trajectory is derived from the turning radius (the wheelbase) and the angular velocity, and the calculated odometry is plotted against it.</p>" },
      { h: "Parameter Variation", b: "<p>Sampling time and motor power are then swept independently to see how each affects odometry accuracy on both the linear and circular runs. Errors over time are plotted to expose where the integrator drifts most.</p>" }
    ]
  },

  {
    slug: "me308-lab5",
    title: "Box Paint & Drying Cell — PLC + PID",
    course: "ME 308 · Industrial Control · Lab 5",
    date: "2025",
    badge: "PLC Automation",
    badgeClass: "badge--mech",
    categories: ["mechatronics"],
    pdf: "pdfs/ME308_LAB5.pdf",
    images: 6,
    summary: "PLC-driven industrial cell that detects an incoming box, conveys it through a 20-second spray-paint stage and a 1-minute hot-air drying chamber, repeats the cycle three times and pushes the finished box into storage with a pneumatic piston. Two PID loops regulate chamber temperature.",
    tags: ["Siemens TIA Portal", "Ladder logic", "PID", "Conveyor", "Pneumatics"],
    sections: [
      { h: "Process", b: "<ol><li>Operator places a box at the In position; system signals readiness.</li><li>Conveyor moves the box into the spray chamber.</li><li>Spray gun runs for 20 seconds.</li><li>Conveyor moves the box into the hot-air chamber.</li><li>Hot-air fan runs for 1 minute.</li><li>Steps 2–5 repeat <strong>three times</strong>.</li><li>Pneumatic piston pushes the finished box off the conveyor into storage.</li></ol>" },
      { h: "I/O Map", b: "<p><strong>Actuators:</strong> two-direction conveyor motor (<code>Q4.0</code>, <code>Q4.2</code>), spray gun (<code>Q4.6</code>), hot-air fan (<code>Q4.6</code>), pneumatic piston (<code>Q4.4</code>), \"Operation in Progress\" lamp (<code>Q4.7</code>), \"Ready for Operation\" lamp (<code>Q4.1</code>).</p><p><strong>Sensors:</strong> Box-In (<code>I0.7</code>), Box-Out (<code>I0.4</code>), Spray-Left (<code>I0.2</code>), Spray-Right door (<code>I1.0</code>), Hot-Air (<code>I0.1</code>), Start button (<code>I0.6</code>).</p>" },
      { h: "PID Temperature Control", b: "<p>Two PID controllers manage chamber temperatures, both built from the same shared block to keep tuning consistent. The PID is constructed in ladder logic from three multiplication blocks (error × Kp, ∫error × Ki, derror/dt × Kd) summed in two stages because each addition block accepts a maximum of two inputs.</p><ul><li><strong>Spray chamber:</strong> Kp = 10, Ki = 1, Kd = 2 (memory words 30 / 32 / 34 / 36).</li><li><strong>Hot-air chamber:</strong> Kp = 20, Ki = 1, Kd = 3 (memory words 40 / 42 / 44 / 46).</li></ul>" },
      { h: "Program Networks", b: "<p>The TIA Portal program is split into seven networks: System Ready, Spray Painting, Conveyor → Hot Air, Hot-Air Drying, Manual Cycle Handling (the cycle is duplicated three times in ladder), Box Out & Repeat, plus the PID logic. Timers in test mode were shortened (2 s and 6 s) so the system could be exercised quickly without waiting for the full 20 s / 60 s production timings.</p>" }
    ]
  },

  {
    slug: "me308-lab7",
    title: "Sequential Motor Control with Bolt Counting",
    course: "ME 308 · Industrial Control · Lab 7",
    date: "2025",
    badge: "PLC Automation",
    badgeClass: "badge--mech",
    categories: ["mechatronics"],
    pdf: "pdfs/me308_lab7.pdf",
    images: 6,
    summary: "Beckhoff touch-panel system that orchestrates a motor through a state-driven sequence: soft start/stop, lock/unlock, manual CW/CCW, and automatic operation that uses two proximity sensors to detect bolts and a blinking signal lamp once the user-defined target count is reached.",
    tags: ["Beckhoff", "TwinCAT", "ST (Structured Text)", "Function Blocks", "State machine"],
    sections: [
      { h: "Architecture", b: "<p>The program is split into four Function Blocks for clean separation of concerns:</p><ul><li><strong>c001 — Coordinator:</strong> handles system locking/unlocking and transitions between states.</li><li><strong>m001 — Detect Bolts:</strong> drives the motor based on proximity sensor feedback.</li><li><strong>m002 — Manual Control:</strong> manual CW/CCW operation gated by timers.</li><li><strong>m003 — Blink Lamp & Bolt Counting:</strong> blinks the signal lamp and counts bolts triggered by <code>prox2</code>.</li></ul>" },
      { h: "Globals", b: "<p>I/O is declared in a global VAR block: soft Start/Stop, Lock trigger, manual CW/CCW buttons, two proximity sensors <code>prox1</code>/<code>prox2</code>, motor Run/Direction relays, and a signal lamp. The state machine carries <code>state_number</code> (current state), <code>boltCount</code> (counter), and <code>userN</code> (target count, default 3).</p>" },
      { h: "Coordinator (c001)", b: "<p>A rising-edge trigger on the lock button engages the motor for unlocking. Pressing Start moves the system to <code>state_number := 1</code>; pressing Stop drops everything to the safe state (motor off, lamp off, state 0).</p>" },
      { h: "Detect Bolts (m001)", b: "<p>Motor runs clockwise until <code>prox1</code> trips. After detection the direction reverses (CCW). When <code>prox2</code> trips after a <code>prox1</code> detection, the system stops the motor and transitions to state 2.</p>" },
      { h: "Manual Control (m002)", b: "<p>Lets the user drive the motor with CW/CCW buttons within a 10-second window (<code>m002_timer1</code>). After the window closes, a 5-second cooldown (<code>m002_timer2</code>) elapses before the system jumps to state 3.</p>" },
      { h: "Lamp & Bolt Counting (m003)", b: "<p>Lamp blinks every 500 ms while active. Each rising edge on <code>prox2</code> increments <code>boltCount</code>; once it reaches <code>userN</code> the system stops the motor and lamp, resets the counter, and returns to state 1.</p>" }
    ]
  },

  {
    slug: "me308-lab8",
    title: "Motor Position Control with Beckhoff & TwinCAT",
    course: "ME 308 · Industrial Control · Lab 8",
    date: "2025",
    badge: "Servo Motion",
    badgeClass: "badge--mech",
    categories: ["mechatronics"],
    pdf: "pdfs/me308#8 _ Motor Position Control System.pdf",
    images: 6,
    summary: "Two servo motors driven by a Beckhoff servo drive, controlled from a TwinCAT program with a touch-panel HMI. Rising-edge detection on EXECUTE triggers an absolute motion command; a completion-edge handler clears the request once the axis reaches its target.",
    tags: ["Beckhoff", "TwinCAT", "MC_MoveAbsolute", "HMI", "Servo control"],
    sections: [
      { h: "Hardware & Software", b: "<p><strong>Hardware:</strong> two servo motors mounted in a frame, a Beckhoff servo drive, a Beckhoff touch-screen HMI for user interaction, and a Beckhoff PLC for logic. <strong>Software:</strong> TwinCAT for the control program plus its visualisation tooling for the HMI.</p><p>Goals: enable/disable motor control, set and monitor reference positions for the motor shaft, and execute motion commands while observing the actual position.</p>" },
      { h: "Rising-Edge Execution", b: "<p>The HMI EXECUTE button is monitored with a rising-edge trigger. On the rising edge, the absolute-motion request flag <code>First_Axis_Move_AbsoluteExecute</code> is asserted, which kicks off the motion.</p><p>A second rising-edge handler watches the completion flag <code>First_Axis_Move_AbsoluteDone</code> (combined with the EXECUTE button being released) to clear the execute request — so the function block won't see a stuck command on the next cycle.</p>" },
      { h: "MC_MoveAbsolute Block", b: "<p>The motion itself is wired through TwinCAT's <code>MC_MoveAbsolute</code> function block, parameterised with target Position, Velocity, Acceleration, Deceleration and Jerk (all <code>LREAL</code>). The Done output flows back into the rising-edge logic above, closing the loop between user input, motion, and completion handling.</p>" }
    ]
  },

  {
    slug: "v12-engine",
    title: "V12 Internal Combustion Engine — SolidWorks Assembly",
    course: "ENS 410 · Advanced Solid Modeling · Term Project",
    date: "2024",
    badge: "CAD",
    badgeClass: "badge--cad",
    categories: ["cad"],
    pdf: "pdfs/ens410_V12_FinalReport.pdf",
    images: 6,
    collaborators: "Alp Akyürek, Burak Samet Bozgeyik, Ege Alacalıoğlu",
    supervisor: "Utku Seven",
    summary: "Detailed CAD model of a V12 engine built in SolidWorks. Two banks of six cylinders in a V arrangement working through the four-stroke cycle. Every component modelled — engine block, crankshaft, pistons, valve train, cylinder heads, ignition, intake/exhaust — with appropriate materials per part.",
    tags: ["SolidWorks", "Assembly modelling", "Mates & constraints", "Material selection"],
    sections: [
      { h: "What We Modelled", b: "<p>A complete CAD model of a V12 engine: two banks of six cylinders in a V arrangement, working through the standard four-stroke cycle (intake, compression, combustion, exhaust). The assembly was decomposed into seven subsystems and the materials chosen per part are realistic for each component's role.</p>" },
      { h: "Subsystems", b: "<ul><li><strong>Engine block & core structure</strong> — cylinder housing with 12 piston bores, plus the carter (oil pan) below.</li><li><strong>Crankshaft & rotating assembly</strong> — converts piston linear motion into rotation, with the crank-connection cap securing it.</li><li><strong>Piston & connecting rod system</strong> — pistons, piston pins, connecting rods and connection caps; the pin allows pivotal motion between piston and rod.</li><li><strong>Valve train</strong> — intake/exhaust camshafts, intake/exhaust valves, valve springs, valve nails (locks), retainers and seats.</li><li><strong>Cylinder heads & top components</strong> — mirrored heads forming the V, plus a top cover that shields the camshaft and contains oil.</li><li><strong>Ignition & ancillary components</strong> — spark plugs and fastening nails.</li><li><strong>Intake & exhaust system</strong> — exhaust manifolds, pipes and retainers.</li></ul>" },
      { h: "Materials", b: "<p>Selected per part for realistic strength and weight: <em>AISI 4130</em> normalised steel for pistons and pins, <em>AISI 4340</em> normalised steel for connecting rods and crankshaft, <em>AISI Type A2</em> tool steel for valve seats and retainers, <em>cast carbon steel</em> for the engine block and cylinder bores, aluminium recommended for cylinder heads and head covers, and stainless steel for the exhaust manifold and exhaust piping.</p>" },
      { h: "Modelling Approach", b: "<p>The bulk of the modelling used <strong>boss/cut extrude, swept surfaces, helices, lofts and mirroring</strong>. Dimensions were tracked carefully so that mates and constraints in the assembly stage closed cleanly with no fitment problems. The exercise was as much about teamwork — splitting parts, agreeing interface dimensions, integrating into one assembly — as it was about the CAD itself.</p>" }
    ]
  },

  {
    slug: "spn-ib-3000",
    title: "Manufacturing Processes of the SPN-IB-3000 Positioner",
    course: "IE 309 · Manufacturing Processes · Final Project",
    date: "Spring 2024",
    badge: "Manufacturing",
    badgeClass: "badge--cad",
    categories: ["cad"],
    pdf: "pdfs/IE 309_PROJECT_Final_Report.docx.pdf",
    images: 6,
    collaborators: "Yusuf Yiğitol, Alp Ege Küpelioğlu",
    supervisor: "Muhammet Cahit Kulaç",
    summary: "Process study of ADMEX's SPN-IB-3000 — a single-axis horizontal positioner rated for up to 3000 kg. Mapped its full manufacturing journey (sand casting → plasma cutting → CNC → bending → welding → electrostatic powder coating) and zoomed in on bending for a full mathematical analysis.",
    tags: ["CNC machining", "Plasma cutting", "Sheet metal bending", "Welding", "Process analysis", "Field study"],
    sections: [
      { h: "The Product", b: "<p>The <strong>SPN-IB-3000</strong> is a single-axis horizontal positioner from ADMEX, designed for accurate positioning of light-to-medium payloads up to <strong>3000 kg</strong> at adjustable heights of 750, 1000, 1250 or 1500 mm. Features include state-of-the-art gear reduction, a stationary or movable tailstock, ground bushings with sliding copper blocks, swivel units for air and signals, home/safe position sensors, servo motor integration and selectable paint colours.</p>" },
      { h: "Manufacturing Steps", b: "<ul><li><strong>Sand casting</strong> — pattern with mounting holes and connection points.</li><li><strong>Plasma cutting</strong> — high-velocity ionised gas jet driven from a digital cut blueprint to slice conductive sheet.</li><li><strong>CNC machining</strong> — horizontal milling for heavy, precise operations on the casting.</li><li><strong>Bending & joining</strong> — sheet metal forming on a press brake, with the bending program simulated first to check clearance.</li><li><strong>Welding</strong> — arc struck between electrode and workpiece to fuse the assembly.</li><li><strong>Electrostatic powder coating</strong> — colour-matched powder applied through programmed coating guns.</li></ul>" },
      { h: "Bending — Detailed Analysis", b: "<p>We picked the bending step for the deep-dive mathematical analysis. Key parameters used in the calculation:</p><ul><li><strong>Material:</strong> S355J2+N steel — high strength, good weldability, suited to structural loads.</li><li><strong>Sheet thickness</strong> <code>t = 10 mm</code> — drives bending force and bend strength.</li><li><strong>Internal bend radius</strong> <code>R = 10 mm</code> — chosen to keep stress below the level that would crack the material.</li><li><strong>Bend angle</strong> <code>θ = 45°</code> — must be precise to fit the assembly.</li><li><strong>Bend direction</strong> — upward, dictated by downstream assembly geometry.</li></ul><p>Force, power and tooling were all derived from these parameters, with a press brake selected accordingly.</p>" },
      { h: "Field Study", b: "<p>Regular visits to the ADMEX facility provided a practical perspective and let us bridge the gap between textbook process descriptions and what real-world operators actually do at the machine.</p>" }
    ]
  },

  {
    slug: "spherical-rt",
    title: "Real-Time Kinematic Control of a Spherical Robot",
    course: "Companion to the graduation project",
    date: "2026",
    badge: "Robotics",
    badgeClass: "badge--robotics",
    categories: ["robotics", "controls"],
    pdf: "pdfs/Real-Time_Kinematic_Control_of_a_Spherical_Robot.pdf",
    images: 6,
    summary: "Companion document to the graduation project: the kinematic model and the real-time controller that drives the two contact wheels of the spherical manipulator, including the math used to map desired sphere rotations to wheel-velocity commands.",
    tags: ["Inverse kinematics", "Real-time control", "Wheeled drive", "Quaternions"],
    sections: [
      { h: "What's in This Document", b: "<p>This is a focused companion to the <a href=\"project.html?slug=spherical-graduation\">graduation project on the parallel spherical manipulator</a>. While the main report covers the full project — drift compensation, vision system, integration, hardware repairs — this document zooms in on the <strong>kinematic model</strong> and the <strong>real-time controller</strong> that drive the two contact wheels of the spherical robot.</p>" },
      { h: "Kinematic Model", b: "<p>The robot is modelled as five bodies: the sphere <code>K</code>, two links <code>LR</code>/<code>LL</code> and two wheels <code>WR</code>/<code>WL</code>, with auxiliary frames <code>BR</code>/<code>BL</code> defined on the contact normals between wheels and sphere. The sphere's orientation is represented in <strong>unit quaternions</strong> to avoid singularities, and the contact-point velocities provide the non-holonomic motion constraints that link wheel rotation to sphere rotation.</p>" },
      { h: "Real-Time Controller", b: "<p>The controller maps a desired sphere rotation onto the four motor commands (two steering, two driving) and runs them at the loop rate set by the Quanser/MATLAB stack. PID controllers per motor track the references, with filtering tuned to the noise profile of the encoders.</p>" }
    ]
  },

  {
    slug: "vision-orientation",
    title: "Vision-Based Orientation Tracking",
    course: "Companion to the graduation project",
    date: "2026",
    badge: "Computer Vision",
    badgeClass: "badge--robotics",
    categories: ["robotics", "ml"],
    pdf: "pdfs/Vision-Based Orientation Tracking.pdf",
    images: 6,
    summary: "The vision side of the spherical-robot stack: hardware (Raspberry Pi 5 8GB + Arducam OV9281 monochrome global-shutter camera) and the mathematical/algorithmic pipeline that turns AprilTag detections on a curved surface into a 3D orientation estimate.",
    tags: ["Global-shutter camera", "AprilTag", "Pose estimation", "Raspberry Pi", "Monochrome imaging"],
    sections: [
      { h: "Role in the System", b: "<p>This document is the vision-system spec that sits underneath the <a href=\"project.html?slug=spherical-graduation\">graduation project</a>. While the main report explains <em>why</em> the vision-based drift compensation system exists, this document explains <em>what hardware</em> runs it and <em>what algorithm</em> it implements.</p>" },
      { h: "Hardware", b: "<ul><li><strong>Raspberry Pi 5 — 8 GB</strong> — the on-device computer that runs the perception pipeline and streams the result to the Simulink controller over UDP.</li><li><strong>Arducam OV9281 — 1 MP monochrome global-shutter</strong> — chosen for its global shutter (no rolling-shutter distortion on a moving sphere) and its monochrome sensor, which gives sharper marker edges than a Bayer-array colour sensor of the same resolution.</li></ul><p>In practice the system ran at ~17 fps despite the camera supporting 100+ fps, limited by Raspberry Pi 5 throughput on the marker-detection pipeline.</p>" },
      { h: "Algorithmic Pipeline", b: "<p>The sphere's surface is covered with AprilTag/ArUco markers each with a unique ID. The pipeline detects markers in the image, recovers each marker's 2D corner positions, and uses a <strong>ray–sphere intersection</strong> formulation — knowing the camera intrinsics, the camera-to-sphere geometry, and the marker layout on the sphere — to recover where on the sphere each marker currently sits. Aggregating across visible markers yields the sphere's absolute 3D orientation, independent of any wheel measurement.</p>" }
    ]
  },

  {
    slug: "patent-sep-2000",
    title: "STK-SEP-2000 — Robotic Linear Motion Unit (initial design)",
    course: "Türk Patent · TR 2022/014378",
    date: "Filed 11 November 2022 · Locarno 15-99",
    badge: "Registered Design · 2022",
    badgeClass: "badge--cad",
    categories: ["patents", "cad"],
    pdf: "pdfs/ADMEX_STK-SEP-2000_Catalog.pdf",
    images: 8,
    collaborators: null,
    supervisor: null,
    summary: "First-generation robotic linear motion unit, registered as a Turkish industrial design in the candidate's name. Commercialised by ADMEX as the STK-SEP-2000 — an ATEX Zone 21 certified exproof robot track for paint booths and other dirty / explosive environments.",
    tags: ["Industrial design", "Türk Patent 2022", "STK-SEP-2000", "Exproof robot track", "ATEX Zone 21", "ADMEX"],
    sections: [
      { h: "Registered Design", b: "<p><strong>Türkiye Patent &amp; Trademark Office</strong> — Industrial design <strong>TR 2022/014378</strong>, filed <strong>11 November 2022</strong> under Locarno class <code>15-99</code> (machines, not elsewhere specified). <strong>Inventor and applicant: Göktuğ Arda Gök.</strong></p><p>This was the <em>initial</em> design of the robotic linear motion unit family — the design that became the production <strong>STK-SEP-2000</strong> and seeded the second-generation Full-Protection Robot Slider System covered by the 2024 patents.</p>" },
      { h: "Product — STK-SEP-2000", b: "<p>ADMEX commercialised the design as the <strong>STK-SEP-2000 Exproof Painting Track</strong> — an <strong>ATEX Zone 21–certified</strong> exproof robot track motion. The standard equipment and options are tailored for dirty-environment applications: <strong>sand blasting, machining, laser cutting, flammable / explosive environments</strong>, and especially industrial painting.</p><ul><li>Exproof construction certified for ATEX Zone 21 (paint and dust atmospheres).</li><li><strong>0.01 mm</strong> repeatability.</li><li><strong>10 million-meter</strong> service life.</li><li>Designed for very narrow paint-booth integrations — see the bus-painting installation in the catalogue.</li></ul>" },
      { h: "Why it matters", b: "<p>Conventional robot tracks fail in paint booths because the open cable chains and exposed drive components ignite the solvent atmosphere or get clogged by overspray. The SEP design solves both problems by enclosing the drive train and meeting ATEX's strict explosion-prevention rules — letting a 6-axis robot live inside a Zone 21 booth instead of being mounted outside it.</p>" },
      { h: "Reference document", b: "<p>The bundled PDF is the <strong>ADMEX product catalogue</strong> for the STK-SEP-2000 / STA Steel Series — the most useful public document of the registered design's commercialised form. The original Türk Patent certificate (TR 2022/014378) is referenced in the candidate's CV.</p>" }
    ]
  },

  {
    slug: "patent-sta-slider",
    title: "Full Protection Robot Slider System — STA-060 + Profile (refined design family)",
    course: "Türk Patent · TR 2024/010626 + TR 2024/010627",
    date: "Filed 16 December 2024 · Locarno 15-09 · PCT/TR2024/051751",
    badge: "Registered Design · 2024 + PCT",
    badgeClass: "badge--cad",
    categories: ["patents", "cad"],
    pdf: "pdfs/Patent_2024_010627_RobotSlider.pdf",
    images: 4,
    collaborators: null,
    supervisor: null,
    summary: "Second-generation, fully-enclosed robotic slider system commercialised by ADMEX as the STA-060. Two combined Türkiye industrial designs (the slider itself and its custom-extruded structural profile) plus an international PCT filing — all in the candidate's name.",
    tags: ["Industrial design", "STA-060", "Robot slider", "Aluminium extrusion", "PCT international", "Türk Patent 2024"],
    sections: [
      { h: "Registered Design", b: "<p>Two Türkiye industrial-design registrations filed jointly on <strong>16 December 2024</strong> and registered together as one design family. <strong>Inventor and applicant: Göktuğ Arda Gök.</strong> Locarno class <code>15-09</code> (machines for handling and positioning).</p><ul><li><strong>TR 2024/010627</strong> — the slider unit itself (single design, four views).</li><li><strong>TR 2024/010626</strong> — the custom-extruded structural profile (multi-design, three cross-section variations).</li><li><strong>PCT/TR2024/051751</strong> — international filing under the Patent Cooperation Treaty.</li></ul><p>The two designs are registered as one combined family because the slider's load path runs straight through the custom profile — they only work together.</p>" },
      { h: "Product — STA-060", b: "<p>ADMEX commercialised the design as the <strong>STA-060</strong>, the entry point of the STA Steel Series robot tracks. Headline specs:</p><ul><li>Max payload <strong>6,000 kg per carriage</strong>.</li><li>Max speed <strong>60 m/min</strong>, max acceleration <strong>1 m/s²</strong>.</li><li>Repeatability <strong>±0.01 mm</strong>; <strong>10 million-meter</strong> service life.</li><li>Stroke from <strong>2 m</strong> in <strong>1 m</strong> steps; total length = stroke + 2,050 mm.</li><li>Robot payload class <strong>700–1,000 kg</strong>; floor / ceiling / elevated mounting.</li><li>Options: double carriage, automatic lubrication, inner cable chain (no external cable carrier), walkable cover, forklift-grade load over the cover, exproof variant.</li></ul>" },
      { h: "Why two registrations", b: "<p>The aluminium <strong>structural profile</strong> is the spine of the slider — it's the part that takes the load, hosts the rail, and carries the inner cable chain. Filing it as a separate multi-design (3 variations) on top of the slider design protects the family as a coherent whole: a competitor can't lift the profile cross-section and pair it with a different carriage to design around the slider patent.</p>" },
      { h: "Reference documents", b: "<p>The primary PDF is the <strong>TR 2024/010627</strong> slider certificate. The matching profile certificate (<strong>TR 2024/010626</strong>) is bundled in the same repo at <code>pdfs/Patent_2024_010626_Profile.pdf</code> and its design plates appear in the figures gallery below.</p>" }
    ]
  },

  {
    slug: "siyel",
    title: "Siyel — AI-based Kitchen Hygiene, Safety & Operations Monitoring",
    course: "Startup · TÜBİTAK BİGG track · Pitch deck",
    date: "September 2025",
    badge: "Startup",
    badgeClass: "badge--other",
    categories: ["other", "ml"],
    pdf: "pdfs/Siyel.pdf",
    images: 12,
    collaborators: "Defne Kızılkaya · Ömür Kaan Sarı · Mustafa Gökhan Arslan",
    supervisor: null,
    summary: "Pitch deck for Siyel — a real-time AI computer-vision platform that watches professional kitchens for hygiene, occupational-safety and workflow violations, and flags them instantly. Targeting restaurant chains, catering and hotels through a SaaS + camera-hardware model.",
    tags: ["Computer vision", "Real-time AI", "PPE detection", "SaaS", "Foodservice", "TÜBİTAK BİGG"],
    sections: [
      { h: "The Problem & Opportunity", b: "<p>Hygiene and workplace-safety in professional kitchens is mostly checked manually — staff inspections, periodic clipboards, paper checklists. Three failure modes recur: <strong>weak supervision</strong> (slow, subjective, gaps in compliance), <strong>hidden hazards</strong> (missing PPE and unsafe behaviour drive contamination, accidents and brand-reputation loss), and <strong>blind decisions</strong> (without records and analytics, operators can't see patterns or improve processes).</p><p>The cost is non-trivial: <strong>~600 million people fall ill from contaminated food each year</strong> globally (WHO), and food-borne illness alone costs the United States about <strong>$17.6 billion a year</strong> (CDC).</p>" },
      { h: "Solution & Value Proposition", b: "<p><strong>Siyel</strong> is a real-time AI system that watches kitchens through cameras and reports violations the moment they happen. Four headline benefits:</p><ul><li><strong>Real-time detection</strong> of PPE violations and unsafe behaviour.</li><li><strong>Instant alerts and reports</strong> pushed to managers via dashboard, SMS or e-mail.</li><li><strong>24/7 automated, unbiased monitoring</strong> that doesn't depend on a supervisor walking by.</li><li><strong>Compatible with existing cameras</strong>, lowering rollout cost and enabling cheap scaling.</li></ul><p>Primary buyers: <strong>restaurant chains and cafés</strong>, <strong>catering / institutional foodservice</strong>, and <strong>hotels &amp; resorts</strong>.</p>" },
      { h: "Core Technology Architecture", b: "<p>The platform is built as a five-stage pipeline:</p><ol><li><strong>Camera layer</strong> — ingests video from new or existing in-kitchen cameras.</li><li><strong>Data flow</strong> — frames stream into the analysis backend.</li><li><strong>Image processing &amp; AI analysis</strong> — object detection / tracking models flag people, PPE items (hat, apron, gloves), tools and unsafe contact events (e.g. dropped food still served, no-handwash entries).</li><li><strong>Incident management</strong> — detected events are deduplicated, classified by severity and routed.</li><li><strong>Notification &amp; response</strong> + <strong>reporting &amp; learning</strong> — managers get an instant alert; the system learns from outcomes to keep reducing false positives.</li></ol>" },
      { h: "Business Model & Pricing", b: "<p>SaaS subscription priced by venue size, plus optional camera hardware sales:</p><ul><li><strong>Small kitchen</strong> (1–3 cameras): 2,500–3,500 ₺ / month, 20,000–30,000 ₺ setup.</li><li><strong>Medium</strong> (5–10 cameras): 6,000–9,000 ₺ / month, 30,000–40,000 ₺ setup.</li><li><strong>Large</strong> (>10 cameras): 12,000–18,000 ₺ / month, 40,000–50,000 ₺ setup.</li><li><strong>Camera hardware</strong>: 2,500–5,000 ₺ per unit when needed.</li></ul><p>Sales channels: direct sales, camera-system partnerships, sector trade fairs, digital marketing, free demos / pilots, and (later) international expansion.</p>" },
      { h: "Market", b: "<p><strong>Global AI in Food &amp; Beverages</strong> is forecast to grow from ~$11B in 2024 to <strong>~$263B by 2034</strong> (~37% CAGR, Precedence Research).</p><p><strong>Turkey foodservice market</strong>: $14.7B in 2025 → $27.1B by 2030 (~13% CAGR, Mordor Intelligence).</p><ul><li><strong>TAM</strong>: Turkey foodservice — $14.7B → $27B.</li><li><strong>SAM</strong>: ~$150M (≈1–2% of the Turkish market).</li><li><strong>SOM</strong>: ~$20M as the first-stage capture target.</li></ul>" },
      { h: "Competitive Landscape", b: "<p>We benchmark Siyel against the closest analogues:</p><ul><li><strong>Wobot.ai</strong> — broad SOP video analytics across multiple sectors. ~$14.9M ARR estimate (Growjo); 2024 revenue ~$953K growing &gt;100% YoY; small ~6-person team.</li><li><strong>Winnow</strong> — food-waste reduction (different problem).</li><li><strong>YIKA</strong> — hand-hygiene only.</li><li><strong>Intenseye</strong> — general workplace safety (not kitchen-specific). ~$15.7M revenue 2023; closed a $25M Series A in early 2025; active in 40+ countries.</li></ul><p>Siyel's edge is the combination they don't offer together: <strong>hygiene + occupational safety on one platform</strong>, purpose-built for kitchens / HORECA, working with the cameras the venue already owns, with instant violation alerts and a central control panel for management audits.</p>" },
      { h: "Validated Demand", b: "<p>Letters of intent secured from six businesses spanning the target segments:</p><ul><li><strong>BigChefs</strong> · <strong>Feat Burger</strong> — restaurant chains</li><li><strong>Deniz Kızı Urla Hotel</strong> · <strong>Otel Erten</strong> — hotels</li><li><strong>Mercan Kebap</strong> · <strong>Mercan Wedding</strong> — restaurant + event catering</li></ul><p>Each has approved the applicability of the solution to their operations.</p>" },
      { h: "Team", b: "<p>Multidisciplinary founding team formed at Sabancı University:</p><ul><li><strong>Göktuğ Arda Gök</strong> — Founder &amp; System Architect (Sabancı · FANUC · Altınay Savunma).</li><li><strong>Defne Kızılkaya</strong> — Software &amp; AI Lead (Sabancı · Koçfinans · Expert Team).</li><li><strong>Ömür Kaan Sarı</strong> — Control Systems Lead (Sabancı · Brisa · TU Darmstadt).</li><li><strong>Mustafa Gökhan Arslan</strong> — Operations Lead (Migros One · Sabancı · TÜBİTAK).</li></ul>" },
      { h: "Roadmap", b: "<ul><li><strong>July 2025</strong> — TÜBİTAK BİGG application.</li><li><strong>January 2026</strong> — Prototype software developed; apply to investment programmes such as BiGG+.</li><li><strong>July 2026</strong> — Procure hardware + software stack; first pilot deployments begin; restaurant-side application development starts.</li><li><strong>September 2027</strong> — Pilot results analysed; refinements based on field data.</li><li><strong>January 2028</strong> — Public launch and marketing push.</li><li><strong>June 2028</strong> — Serving 10+ active venues.</li></ul>" },
      { h: "Financials", b: "<p><strong>Initial budget — 900,000 ₺</strong>: Personnel 60.8%, Tools/Equipment 28.1%, Materials 11.1%.</p><p><strong>Unit economics</strong>: ₺60,000 unit price · ₺36,000 cost · <strong>₺24,000 margin (40%)</strong>. Break-even at <strong>348 units</strong>; target churn <strong>under 10%</strong>. Five-year P&amp;L turns clearly profitable from year 2 onward as installed base grows.</p>" }
    ]
  }
];

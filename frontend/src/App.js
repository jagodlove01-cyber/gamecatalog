
import { useState, useEffect } from "react";
import axios from "axios";
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
export default function App() {
  const [page, setPage] = useState("login");
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [delIdx, setDelIdx] = useState(-1);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [playing, setPlaying] = useState(null);
  const fetchGames = async () => { try { const r = await axios.get(`${API}/games`); setGames(r.data); } catch(e) {} };
  useEffect(() => { if (page === "catalog") fetchGames(); }, [page]);
  const login = async () => {
    if (password === "candycane") { setIsAdmin(true); setPage("catalog"); }
    else if (password === "scruw") { setIsAdmin(false); setPage("catalog"); }
    else { window.open("https://www.ixl.com/signin", "_blank"); }
  };
  const logout = () => { setPage("login"); setPassword(""); setIsAdmin(false); setSearchTerm(""); };
  const save = async () => {
    if (!title.trim() || !code.trim()) return;
    try { const r = await axios.post(`${API}/games`, { title, htmlCode: code }); setGames([...games, r.data]); setShowAdd(false); setTitle(""); setCode(""); } catch(e) {}
  };
  const del = async () => {
    if (delIdx >= 0) { try { await axios.delete(`${API}/games/${games[delIdx].id}`); setGames(games.filter((_, i) => i !== delIdx)); } catch(e) {} }
    setShowConfirm(false); setDelIdx(-1);
  };
  const fs = () => { if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(()=>{}); else document.exitFullscreen(); };
  const filtered = searchTerm ? games.filter(g => g.title.toLowerCase().includes(searchTerm.toLowerCase())) : games;
  const S = {
    lc:{width:"100%",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#a8c8d8,#c8d8c8,#d8e8d0,#f0e8d0)",padding:20},
    lb:{background:"#fff",borderRadius:4,padding:"35px 45px 40px",boxShadow:"0 1px 8px rgba(0,0,0,.08)",width:"100%",maxWidth:400,border:"1px solid #d8d8d8"},
    fg:{marginBottom:18},lr:{display:"flex",justifyContent:"space-between",marginBottom:6},
    fl:{fontSize:15,fontWeight:700,color:"#333"},fk:{fontSize:14,color:"#4a90b8",textDecoration:"none"},
    fi:{width:"100%",padding:"14px 12px",fontSize:16,border:"1px solid #c0c0c0",borderRadius:4,outline:"none"},
    br:{display:"flex",alignItems:"center",gap:18,marginTop:22},
    sb:{background:"#8eb534",color:"#fff",fontSize:17,fontWeight:600,padding:"13px 38px",border:"none",borderRadius:4,cursor:"pointer"},
    rl:{display:"flex",alignItems:"center",gap:6,fontSize:15,color:"#555"},
    cc:{width:"100%",height:"100vh",background:"linear-gradient(180deg,#1a1a1a,#0d0d0d)",padding:20,display:"flex",flexDirection:"column",overflow:"auto"},
    ch:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:15,paddingBottom:15,borderBottom:"2px solid #cc0000",flexWrap:"wrap",gap:10},
    ct:{fontFamily:"Impact",fontSize:28,color:"#cc0000",textTransform:"uppercase",letterSpacing:2},
    hb:{display:"flex",gap:10},
    ab:{background:"linear-gradient(180deg,#cc0000,#990000)",color:"#fff",fontWeight:700,padding:"10px 20px",border:"2px solid #ff3333",borderRadius:8,cursor:"pointer",textTransform:"uppercase",fontSize:14},
    fb:{background:"transparent",color:"#cc0000",padding:"10px 15px",border:"1px solid #cc0000",borderRadius:8,cursor:"pointer",fontSize:18},
    ob:{background:"transparent",color:"#999",padding:"10px 15px",border:"1px solid #444",borderRadius:8,cursor:"pointer"},
    si:{width:"100%",padding:"12px 18px 12px 42px",fontSize:15,background:"#1a1a1a",border:"2px solid #333",borderRadius:8,color:"#fff",outline:"none"},
    gg:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:20,flex:1},
    gc:{background:"linear-gradient(145deg,#2a2a2a,#1a1a1a)",border:"2px solid #333",borderRadius:12,padding:15,transition:"all .3s"},
    gt:{width:"100%",height:120,border:"1px solid #444",borderRadius:8,background:"#fff",marginBottom:12,overflow:"hidden",pointerEvents:"none"},
    gi:{width:"400%",height:"400%",border:"none",transform:"scale(.25)",transformOrigin:"top left",pointerEvents:"none"},
    gn:{fontSize:16,fontWeight:700,color:"#fff",textAlign:"center",marginBottom:12,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},
    cb:{display:"flex",gap:8,justifyContent:"center"},
    pb:{background:"linear-gradient(180deg,#cc0000,#990000)",color:"#fff",fontWeight:700,padding:"8px 25px",border:"none",borderRadius:6,cursor:"pointer",textTransform:"uppercase",fontSize:13},
    db:{background:"#440000",color:"#ff6666",padding:"8px 15px",border:"1px solid #660000",borderRadius:6,cursor:"pointer",fontSize:13,fontWeight:700},
    ng:{gridColumn:"1/-1",textAlign:"center",padding:40,color:"#666",fontSize:16,background:"#1a1a1a",border:"2px dashed #333",borderRadius:12},
    mo:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,zIndex:1000},
    mb:{background:"linear-gradient(145deg,#2a2a2a,#1a1a1a)",border:"2px solid #cc0000",borderRadius:12,padding:25,width:"100%",maxWidth:500,maxHeight:"90%",overflow:"auto"},
    mt:{fontFamily:"Impact",fontSize:24,color:"#cc0000",textAlign:"center",marginBottom:20,textTransform:"uppercase"},
    ml:{display:"block",fontSize:13,fontWeight:700,color:"#fff",marginBottom:6,textTransform:"uppercase"},
    mi:{width:"100%",padding:"10px 12px",fontSize:15,background:"#0d0d0d",border:"1px solid #444",borderRadius:6,color:"#fff",outline:"none"},
    ma:{width:"100%",padding:"10px 12px",fontSize:13,fontFamily:"monospace",background:"#0d0d0d",border:"1px solid #444",borderRadius:6,color:"#0f0",outline:"none",resize:"vertical",minHeight:150},
    ms:{background:"linear-gradient(180deg,#cc0000,#990000)",color:"#fff",fontWeight:700,padding:"10px 35px",border:"none",borderRadius:6,cursor:"pointer",textTransform:"uppercase"},
    mc:{background:"transparent",color:"#999",padding:"10px 25px",border:"1px solid #444",borderRadius:6,cursor:"pointer"},
    co:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,.9)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,zIndex:2000},
    cx:{background:"#1a1a1a",border:"2px solid #cc0000",borderRadius:12,padding:25,textAlign:"center",maxWidth:350},
    cy:{background:"#cc0000",color:"#fff",fontWeight:700,padding:"10px 30px",border:"none",borderRadius:6,cursor:"pointer"},
    cn:{background:"#333",color:"#fff",padding:"10px 30px",border:"none",borderRadius:6,cursor:"pointer"},
    pc:{width:"100%",height:"100vh",background:"#0d0d0d",display:"flex",flexDirection:"column"},
    ph:{display:"flex",alignItems:"center",gap:15,padding:"10px 20px",background:"#1a1a1a",borderBottom:"2px solid #cc0000"},
    bb:{background:"transparent",color:"#cc0000",fontWeight:700,padding:"8px 15px",border:"1px solid #cc0000",borderRadius:6,cursor:"pointer"},
    pf:{background:"transparent",color:"#cc0000",padding:"8px 12px",border:"1px solid #cc0000",borderRadius:6,cursor:"pointer",fontSize:16,marginLeft:"auto"},
    pt:{fontSize:16,color:"#fff",flex:1},
    gf:{flex:1,width:"100%",border:"none",background:"#fff"}
  };
  if (page==="login") return(
    <div style={S.lc}><div style={S.lb}>
      <div style={S.fg}><div style={S.lr}><label style={S.fl}>Username</label><a href="#" style={S.fk} onClick={e=>e.preventDefault()}>Forgot username?</a></div><input style={S.fi} value={username} onChange={e=>setUsername(e.target.value)}/></div>
      <div style={S.fg}><div style={S.lr}><label style={S.fl}>Password</label><a href="#" style={S.fk} onClick={e=>e.preventDefault()}>Forgot password?</a></div><input type="password" style={S.fi} value={password} onChange={e=>setPassword(e.target.value)} onKeyPress={e=>{if(e.key==="Enter")login()}}/></div>
      <div style={S.br}><button style={S.sb} onClick={login}>Sign in</button><label style={S.rl}><input type="checkbox" style={{width:16,height:16}}/><span>Remember</span></label></div>
    </div></div>
  );
  if (page==="player"&&playing) return(
    <div style={S.pc}><div style={S.ph}><button style={S.bb} onClick={()=>{setPage("catalog");setPlaying(null)}}>← Back</button><h2 style={S.pt}>{playing.title}</h2><button style={S.pf} onClick={fs}>⛶</button></div><iframe style={S.gf} srcDoc={playing.htmlCode} title={playing.title} allowFullScreen/></div>
  );
  return(
    <div style={S.cc}>
      <div style={S.ch}><h1 style={S.ct}>Game Catalog</h1><div style={S.hb}>{isAdmin&&<button style={S.ab} onClick={()=>setShowAdd(true)}>+ Add Game</button>}<button style={S.fb} onClick={fs}>⛶</button><button style={S.ob} onClick={logout}>Logout</button></div></div>
      <div style={{marginBottom:20,position:"relative"}}><span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#666"}}>&#128269;</span><input style={S.si} placeholder="Search games..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/></div>
      <div style={S.gg}>
        {games.length===0?<div style={S.ng}>No games yet.</div>:filtered.length===0?<div style={S.ng}>No games match.</div>:filtered.map((g,i)=>{const ri=games.findIndex(x=>x.id===g.id);return(
          <div key={g.id} style={S.gc}><div style={S.gt}><iframe srcDoc={g.htmlCode} title={g.title} sandbox="" style={S.gi}/></div><h3 style={S.gn}>{g.title}</h3><div style={S.cb}><button style={S.pb} onClick={()=>{setPlaying(g);setPage("player")}}>Play</button>{isAdmin&&<button style={S.db} onClick={()=>{setDelIdx(ri);setShowConfirm(true)}}>Delete</button>}</div></div>
        )})}
      </div>
      {showAdd&&<div style={S.mo}><div style={S.mb}><h2 style={S.mt}>Add New Game</h2><div style={{marginBottom:15}}><label style={S.ml}>Game Title</label><input style={S.mi} value={title} onChange={e=>setTitle(e.target.value)} placeholder="Enter game title"/></div><div style={{marginBottom:15}}><label style={S.ml}>HTML Code</label><textarea style={S.ma} value={code} onChange={e=>setCode(e.target.value)} placeholder="Paste HTML game code..."/></div><div style={{display:"flex",gap:12,justifyContent:"center"}}><button style={S.ms} onClick={save}>Save Game</button><button style={S.mc} onClick={()=>{setShowAdd(false);setTitle("");setCode("")}}>Cancel</button></div></div></div>}
      {showConfirm&&<div style={S.co}><div style={S.cx}><p style={{color:"#fff",fontSize:16,marginBottom:20}}>Delete "{games[delIdx]?.title}"?</p><div style={{display:"flex",gap:15,justifyContent:"center"}}><button style={S.cy} onClick={del}>Yes, Delete</button><button style={S.cn} onClick={()=>{setShowConfirm(false);setDelIdx(-1)}}>Cancel</button></div></div></div>}
    </div>
  );
}

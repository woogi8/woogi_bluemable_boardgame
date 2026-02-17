import Link from 'next/link';

export const metadata = {
  title: '부루마블 - 게임 설명서',
};

export default function RulesPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1B5E20, #2E7D32 40%, #388E3C 70%, #66BB6A)',
        fontFamily: "'Noto Sans KR', 'Segoe UI', sans-serif",
        padding: '24px 16px',
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
          background: 'rgba(255,255,255,0.97)',
          borderRadius: 16,
          padding: '32px 40px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        }}
      >
        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              marginBottom: 16,
              padding: '6px 20px',
              fontSize: 13,
              fontWeight: 700,
              color: '#fff',
              background: '#2E7D32',
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            ← 게임으로 돌아가기
          </Link>
          <div style={{ fontSize: 11, color: '#2E7D32', fontWeight: 600, letterSpacing: 3 }}>
            SINCE 1982
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: '#1B5E20', letterSpacing: 4, margin: '4px 0' }}>
            부루마블
          </h1>
          <p style={{ fontSize: 14, color: '#388E3C', fontWeight: 700, letterSpacing: 2 }}>
            게임 설명서
          </p>
        </div>

        {/* 목차 */}
        <nav
          style={{
            background: '#F1F8E9',
            borderRadius: 10,
            padding: '16px 24px',
            marginBottom: 32,
            border: '1px solid #C5E1A5',
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 800, color: '#33691E', marginBottom: 8 }}>
            📋 목차
          </div>
          <div style={{ columns: 2, columnGap: 24, fontSize: 12, lineHeight: 2 }}>
            <a href="#prep" style={{ color: '#2E7D32', textDecoration: 'none' }}>1. 게임 준비</a><br />
            <a href="#basic" style={{ color: '#2E7D32', textDecoration: 'none' }}>2. 기본 진행</a><br />
            <a href="#property" style={{ color: '#2E7D32', textDecoration: 'none' }}>3. 땅 구입 / 건물</a><br />
            <a href="#board" style={{ color: '#2E7D32', textDecoration: 'none' }}>4. 보드판 구성</a><br />
            <a href="#special" style={{ color: '#2E7D32', textDecoration: 'none' }}>5. 특수 칸</a><br />
            <a href="#goldenkey" style={{ color: '#2E7D32', textDecoration: 'none' }}>6. 황금열쇠</a><br />
            <a href="#finance" style={{ color: '#2E7D32', textDecoration: 'none' }}>7. 재정 규칙</a><br />
            <a href="#win" style={{ color: '#2E7D32', textDecoration: 'none' }}>8. 승리 조건</a><br />
          </div>
        </nav>

        {/* 1. 게임 준비 */}
        <Section id="prep" num="1" title="게임 준비">
          <Table
            headers={['항목', '내용']}
            rows={[
              ['플레이어 수', '2~4명'],
              ['말(비행기)', '플레이어별 고유 색상 (🔴🔵🟢🟠)'],
              ['초기 자금', '400만원'],
              ['보드판', '40칸 (모서리 4칸 + 각 변 9칸)'],
            ]}
          />
          <Callout>
            모든 플레이어의 말을 출발지에 놓고, 선(첫 번째 플레이어)부터 시작합니다.
          </Callout>
        </Section>

        {/* 2. 기본 진행 */}
        <Section id="basic" num="2" title="기본 진행 규칙">
          <H3>2.1 턴 진행</H3>
          <Ul>
            <li>선부터 <b>시계 방향</b>으로 진행</li>
            <li>자신의 턴에 <b>주사위 2개</b>를 동시에 던진다</li>
            <li>나온 숫자의 <b>합만큼</b> 말을 진행 방향으로 이동</li>
          </Ul>

          <H3>2.2 더블 규칙</H3>
          <Ul>
            <li>두 주사위의 눈이 같으면(더블) <b>한 번 더</b> 던질 수 있다</li>
            <li>더블이 <b>3번 연속</b> 나오면 무인도로 강제 이동</li>
          </Ul>

          <H3>2.3 월급</H3>
          <Callout emoji="💵">
            한 바퀴를 돌아 <b>출발지를 지나가거나 도착</b>하면 은행에서 <b>월급 20만원</b>을 받는다.
          </Callout>
        </Section>

        {/* 3. 땅 구입 / 건물 */}
        <Section id="property" num="3" title="땅 구입 및 건물 건설">
          <H3>3.1 땅 구입</H3>
          <Ul>
            <li>말이 멈춘 곳이 <b>주인 없는 도시</b>이면, 해당 가격을 은행에 지불하고 증서를 받는다</li>
            <li>구입을 원하지 않으면 그냥 넘어갈 수 있다</li>
          </Ul>

          <H3>3.2 건물 종류</H3>
          <Table
            headers={['건물', '설명']}
            rows={[
              ['🏠 별장', '가장 저렴한 건물, 통행료 소폭 증가'],
              ['🏢 빌딩', '중간 가격, 통행료 중폭 증가'],
              ['🏨 호텔', '가장 비싼 건물, 통행료 대폭 증가'],
            ]}
          />
          <Ul>
            <li>한 도시에 <b>별장 → 빌딩 → 호텔</b> 순으로 건설 (최대 3단계)</li>
            <li>건설 비용: 땅 가격의 <b>50%</b></li>
          </Ul>

          <H3>3.3 통행료</H3>
          <Ul>
            <li>다른 플레이어의 말이 자기 소유 땅에 멈추면 통행료를 받는다</li>
            <li>건물이 없으면 <b>대지료</b>만 받는다</li>
            <li>건물이 있으면 단계에 따라 통행료가 증가한다</li>
          </Ul>

          <H3>3.4 서울 특별 규칙</H3>
          <Callout emoji="🇰🇷">
            서울은 가장 비싼 땅(50만원)으로, <b>건물 건설이 불가</b>합니다.<br />
            구입 즉시 통행료 <b>200만원</b>을 받을 수 있습니다.
          </Callout>
        </Section>

        {/* 4. 보드판 구성 */}
        <Section id="board" num="4" title="보드판 구성 (40칸)">
          <H3>4.1 도시 구역</H3>
          <Table
            headers={['구역', '도시', '특징']}
            rows={[
              ['아시아', '타이베이, 베이징, 마닐라', '가격 가장 저렴'],
              ['동남아/중동', '싱가포르, 카이로, 이스탄불', '저~중 가격'],
              ['북유럽', '아테네, 코펜하겐, 스톡홀름', '중간 가격'],
              ['서유럽', '베른, 베를린, 오타와', '중간 가격'],
              ['남미/오세아니아', '부에노스아이레스, 상파울루, 시드니', '중상 가격'],
              ['태평양/이베리아', '하와이, 리스본, 마드리드', '중상 가격'],
              ['선진국', '도쿄, 파리, 로마', '비싼 구역'],
              ['영미권', '런던, 뉴욕', '비싼 구역'],
              ['한국', '제주도, 부산, 서울', '특수 도시'],
            ]}
          />

          <H3>4.2 이동수단</H3>
          <Table
            headers={['이동수단', '가격', '통행료']}
            rows={[
              ['✈️ 콩코드 여객기', '20만원', '소유 개수 x 20만원'],
              ['🚢 퀸엘리자베스호', '25만원', '소유 개수 x 25만원'],
              ['🚀 컬럼비아호', '30만원', '소유 개수 x 30만원'],
            ]}
          />
          <Callout>
            이동수단을 여러 개 소유할수록 통행료가 <b>배수로 증가</b>합니다.
          </Callout>

          <H3>4.3 특수 칸</H3>
          <Table
            headers={['칸', '효과']}
            rows={[
              ['🚀 출발 (0번)', '지나가거나 도착 시 월급 20만원'],
              ['🏝️ 무인도 (10번)', '3턴 동안 갇힘'],
              ['🛸 우주여행 (20번)', '원하는 곳으로 이동'],
              ['🌍 세계일주 (30번)', '출발로 이동 + 월급'],
              ['💰 사회복지기금 (38번)', '15만원 납부'],
              ['🔑 황금열쇠 (4곳)', '카드 뽑기'],
            ]}
          />
        </Section>

        {/* 5. 특수 칸 */}
        <Section id="special" num="5" title="특수 칸 상세 규칙">
          <H3>🏝️ 무인도</H3>
          <Ul>
            <li>도착 시 <b>3턴 동안</b> 갇힌다</li>
            <li>갇혀 있는 동안 매 턴 주사위를 던져 <b>더블이 나오면</b> 즉시 탈출</li>
            <li>3턴이 지나면 자동 탈출</li>
            <li><b>무인도 탈출권(📻)</b>으로도 즉시 탈출 가능</li>
          </Ul>

          <H3>🛸 우주여행</H3>
          <Ul>
            <li>도착하면 <b>랜덤 위치</b>로 이동</li>
            <li>컬럼비아호 증서 소유자에게 <b>30만원</b> 지불</li>
            <li>이동 시 출발지를 지나가면 월급 수령</li>
          </Ul>

          <H3>💰 사회복지기금</H3>
          <Ul>
            <li><b>접수처(38번)</b>: 도착 시 15만원을 기금으로 납부</li>
            <li>황금열쇠 카드로 <b>적립된 기금 전액</b> 수령 가능</li>
          </Ul>

          <H3>🌍 세계일주</H3>
          <Ul>
            <li>도착하면 자동으로 출발지로 이동</li>
            <li><b>월급 20만원</b> 수령</li>
          </Ul>
        </Section>

        {/* 6. 황금열쇠 */}
        <Section id="goldenkey" num="6" title="황금열쇠 카드 (30장)">
          <Callout emoji="🔑">
            황금열쇠 칸에 도착하면 카드더미 맨 위의 카드를 뽑아 실행합니다.<br />
            사용 후 카드더미 맨 아래에 돌려놓습니다.
          </Callout>

          <H3>보관 가능 카드</H3>
          <Table
            headers={['카드', '효과']}
            rows={[
              ['🎫 우대권 (2장)', '상대방 땅에서 통행료 1회 면제'],
              ['📻 무인도 탈출권 (1장)', '무인도 즉시 탈출'],
            ]}
          />

          <H3>이동 카드</H3>
          <Table
            headers={['카드', '효과']}
            rows={[
              ['✈️ 항공여행', '콩코드 경유 → 타이베이 이동'],
              ['🚢 유람선', '퀸엘리자베스 경유 → 베이징 이동'],
              ['🏎️ 고속도로', '출발지로 이동 (월급 수령)'],
              ['🍊🌊🇰🇷 관광여행', '제주도 / 부산 / 서울로 이동'],
              ['🏝️ 무인도', '무인도로 즉시 이동'],
              ['🛸 우주여행 초대권', '우주여행 칸으로 이동'],
              ['🌍 세계일주', '출발지로 이동 (월급 수령)'],
              ['💰 사회기금 배당', '적립된 기금 전액 수령'],
              ['⬅️ 뒤로 이동', '2칸 또는 3칸 뒤로 이동'],
            ]}
          />

          <H3>세금/비용 카드</H3>
          <Table
            headers={['카드', '효과']}
            rows={[
              ['📉 반액대매출', '가장 비싼 부동산을 반값에 강제 매각'],
              ['📋 정기종합소득세', '건물 1개당 5만원'],
              ['🔧 건물수리비', '건물 1개당 3만원'],
              ['🔒 방범비', '건물 1개당 2만원'],
            ]}
          />

          <H3>상금/지출 카드</H3>
          <Table
            headers={['카드', '효과']}
            rows={[
              ['🏆 노벨평화상', '+30만원'],
              ['🎰 복권 당첨', '+20만원'],
              ['🏁 자동차경주 우승', '+15만원'],
              ['🎓 장학금 / 👴 연금', '+10만원'],
              ['📚 해외유학', '-20만원'],
              ['🏥 병원비 / 🚔 과속벌금', '-10만원'],
              ['🎂 생일축하', '다른 플레이어에게 각 5만원씩 수령'],
              ['🎤 장기자랑', '다른 플레이어에게 각 5만원씩 지불'],
              ['🏟️ 올림픽 개최', '다른 플레이어에게 각 10만원씩 수령'],
            ]}
          />
        </Section>

        {/* 7. 재정 규칙 */}
        <Section id="finance" num="7" title="재정 규칙">
          <H3>자산 매각</H3>
          <Ul>
            <li>통행료 지불이 어려울 경우 보유 <b>건물을 은행에 매각</b> 가능</li>
          </Ul>

          <H3>파산</H3>
          <Ul>
            <li>지불할 능력이 <b>전혀 없을 때</b> 파산 처리</li>
            <li>파산한 플레이어는 게임에서 퇴장</li>
            <li>소유했던 모든 부동산은 <b>주인 없음</b>으로 전환</li>
          </Ul>
        </Section>

        {/* 8. 승리 조건 */}
        <Section id="win" num="8" title="승리 조건">
          <Table
            headers={['조건', '설명']}
            rows={[
              ['🏆 파산 승리', '한 플레이어를 제외하고 모두 파산하면 생존자 승리'],
            ]}
          />
          <Callout emoji="💡">
            재산 계산: 보유 현금 + 소유 도시 매각 금액
          </Callout>
        </Section>

        {/* 하단 */}
        <div style={{ textAlign: 'center', marginTop: 32, paddingTop: 20, borderTop: '1px solid #E0E0E0' }}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '10px 32px',
              fontSize: 15,
              fontWeight: 800,
              color: '#fff',
              background: 'linear-gradient(135deg, #1B5E20, #4CAF50)',
              borderRadius: 10,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(27,94,32,0.4)',
            }}
          >
            🎮 게임하러 가기
          </Link>
          <p style={{ fontSize: 10, color: '#9E9E9E', marginTop: 12 }}>
            부루마블 원작의 저작권은 씨앗사에 있습니다. 이 프로젝트는 교육 및 학습 목적입니다.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── 재사용 서브 컴포넌트 ── */

function Section({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ marginBottom: 28 }}>
      <h2
        style={{
          fontSize: 18,
          fontWeight: 800,
          color: '#1B5E20',
          borderBottom: '3px solid #A5D6A7',
          paddingBottom: 6,
          marginBottom: 12,
        }}
      >
        {num}. {title}
      </h2>
      {children}
    </section>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#2E7D32', margin: '12px 0 6px' }}>
      {children}
    </h3>
  );
}

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul style={{ paddingLeft: 20, fontSize: 13, color: '#37474F', lineHeight: 1.9, margin: '4px 0 8px' }}>
      {children}
    </ul>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 10 }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 12,
          background: '#fff',
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  background: '#E8F5E9',
                  color: '#1B5E20',
                  fontWeight: 700,
                  padding: '8px 10px',
                  textAlign: 'left',
                  borderBottom: '2px solid #A5D6A7',
                  whiteSpace: 'nowrap',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? '#fff' : '#FAFAFA' }}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: '6px 10px',
                    color: '#37474F',
                    borderBottom: '1px solid #E0E0E0',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callout({ children, emoji = '💡' }: { children: React.ReactNode; emoji?: string }) {
  return (
    <div
      style={{
        background: '#FFF8E1',
        border: '1px solid #FFE082',
        borderRadius: 8,
        padding: '10px 14px',
        margin: '8px 0',
        fontSize: 12,
        color: '#5D4037',
        lineHeight: 1.7,
        display: 'flex',
        gap: 8,
      }}
    >
      <span style={{ fontSize: 16, flexShrink: 0 }}>{emoji}</span>
      <div>{children}</div>
    </div>
  );
}

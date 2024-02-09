use index_vec::IndexVec;
use rustc_hash::FxHashMap;

use crate::SymbolRef;

#[derive(Debug, Default)]
pub struct StmtInfos {
  infos: IndexVec<StmtInfoId, StmtInfo>,
  // only for top level symbols
  symbol_ref_to_declared_stmt_idx: FxHashMap<SymbolRef, Vec<StmtInfoId>>,
}

impl StmtInfos {
  pub fn get(&self, id: StmtInfoId) -> &StmtInfo {
    &self.infos[id]
  }

  pub fn get_mut(&mut self, id: StmtInfoId) -> &mut StmtInfo {
    &mut self.infos[id]
  }

  pub fn add_stmt_info(&mut self, info: StmtInfo) -> StmtInfoId {
    let id = self.infos.push(info);
    for symbol_ref in &self.infos[id].declared_symbols {
      self.symbol_ref_to_declared_stmt_idx.entry(*symbol_ref).or_default().push(id);
    }
    id
  }

  pub fn declared_stmts_by_symbol(&self, symbol_ref: &SymbolRef) -> &[StmtInfoId] {
    self.symbol_ref_to_declared_stmt_idx.get(symbol_ref).map_or(&[], Vec::as_slice)
  }
}

impl std::ops::Deref for StmtInfos {
  type Target = IndexVec<StmtInfoId, StmtInfo>;

  fn deref(&self) -> &Self::Target {
    &self.infos
  }
}

impl std::ops::DerefMut for StmtInfos {
  fn deref_mut(&mut self) -> &mut Self::Target {
    &mut self.infos
  }
}

index_vec::define_index_type! {
  pub struct StmtInfoId = u32;
}

#[derive(Default, Debug)]
pub struct StmtInfo {
  /// The index of this statement in the module body.
  ///
  /// We will create some facade statements while bundling, and the facade statements
  /// don't have a corresponding statement in the original module body, which means
  /// `stmt_idx` will be `None`.
  pub stmt_idx: Option<usize>,
  // currently, we only store top level symbols
  pub declared_symbols: Vec<SymbolRef>,
  // We will add symbols of other modules to `referenced_symbols`, so we need `SymbolRef`
  // here instead of `SymbolId`.
  /// Top level symbols referenced by this statement.
  pub referenced_symbols: Vec<SymbolRef>,
  pub side_effect: bool,
  pub is_included: bool,
}

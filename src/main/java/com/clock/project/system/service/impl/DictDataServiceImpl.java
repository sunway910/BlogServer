package com.clock.project.system.service.impl;

import com.clock.common.utils.SecurityUtils;
import com.clock.project.system.domain.DictData;
import com.clock.project.system.mapper.DictDataMapper;
import com.clock.project.system.service.DictDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @className: DictDataServiceImpl
 * @description: 字典 业务层处理
 * @author: Clock
 * 
 */
@Service
public class DictDataServiceImpl implements DictDataService {
    @Autowired
    private DictDataMapper dictDataMapper;

    @Override
    public List<DictData> selectDictDataList(DictData dictData) {
        return dictDataMapper.selectDictDataList(dictData);
    }


    @Override
    public List<DictData> selectDictDataByType(String dictType) {
        return dictDataMapper.selectDictDataByType(dictType);
    }


    @Override
    public String selectDictLabel(String dictType, String dictValue) {
        return dictDataMapper.selectDictLabel(dictType, dictValue);
    }

    @Override
    public DictData selectDictDataById(Long dictCode) {
        return dictDataMapper.selectDictDataById(dictCode);
    }

    @Override
    public int deleteDictDataById(Long dictCode) {
        String loginUsername = SecurityUtils.getUsername();
        return dictDataMapper.deleteDictDataById(dictCode, loginUsername);
    }

    @Override
    public int insertDictData(DictData dictData) {
        return dictDataMapper.insertDictData(dictData);
    }

    @Override
    public int updateDictData(DictData dictData) {
        return dictDataMapper.updateDictData(dictData);
    }
}
